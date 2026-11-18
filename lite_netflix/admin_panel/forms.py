from django import forms
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from netflix_lite.models import Movie


class AdminLoginForm(forms.Form):
    username = forms.CharField(
        max_length=150,
        widget=forms.TextInput(attrs={
            'class': 'admin-input',
            'placeholder': 'Administrator Username',
            'autocomplete': 'username',
            'required': 'required',
            'autofocus': 'autofocus'
        })
    )
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'admin-input',
            'placeholder': '••••••••••••',
            'autocomplete': 'current-password',
            'id': 'admin-password-input',
            'required': 'required'
        })
    )
    remember_me = forms.BooleanField(
        required=False,
        widget=forms.CheckboxInput(attrs={
            'class': 'admin-checkbox',
            'id': 'remember_me'
        })
    )

    def __init__(self, request=None, *args, **kwargs):
        self.request = request
        self.user_cache = None
        super().__init__(*args, **kwargs)

    def clean(self):
        cleaned_data = super().clean()
        username = cleaned_data.get('username')
        password = cleaned_data.get('password')

        if username and password:
            user = authenticate(self.request, username=username, password=password)
            if user is None:
                raise ValidationError("Invalid username or password. Please check your credentials.")
            
            if not user.is_active:
                raise ValidationError("This administrator account has been deactivated.")
                
            if not user.is_superuser:
                raise ValidationError("Access Denied: Only superusers are authorized to enter the Admin Panel.")

            self.user_cache = user

        return cleaned_data

    def get_user(self):
        return self.user_cache


class MovieForm(forms.ModelForm):
    class Meta:
        model = Movie
        fields = [
            'title',
            'description',
            'release_date',
            'genre',
            'length',
            'image_card',
            'image_cover',
            'video',
        ]
        widgets = {
            'title': forms.TextInput(attrs={
                'class': 'admin-input',
                'placeholder': 'e.g. Interstellar, Stranger Things',
                'required': 'required'
            }),
            'description': forms.Textarea(attrs={
                'class': 'admin-textarea',
                'rows': 4,
                'placeholder': 'Provide an engaging synopsis and storyline summary...',
                'required': 'required'
            }),
            'release_date': forms.DateInput(attrs={
                'class': 'admin-input',
                'type': 'date',
                'required': 'required'
            }),
            'genre': forms.Select(attrs={
                'class': 'admin-select',
                'required': 'required'
            }),
            'length': forms.NumberInput(attrs={
                'class': 'admin-input',
                'min': '1',
                'placeholder': 'Duration in minutes (e.g. 142)',
                'required': 'required'
            }),
            'image_card': forms.FileInput(attrs={
                'class': 'admin-file-input',
                'accept': 'image/*',
                'data-preview': 'card-preview'
            }),
            'image_cover': forms.FileInput(attrs={
                'class': 'admin-file-input',
                'accept': 'image/*',
                'data-preview': 'cover-preview'
            }),
            'video': forms.FileInput(attrs={
                'class': 'admin-file-input',
                'accept': 'video/mp4,video/x-m4v,video/*,image/jfif'
            }),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # If updating an existing movie, files are optional to keep current assets
        if self.instance and self.instance.pk:
            self.fields['image_card'].required = False
            self.fields['image_cover'].required = False
            self.fields['video'].required = False
        else:
            self.fields['image_card'].required = True
            self.fields['image_cover'].required = True
            self.fields['video'].required = True

    def clean_length(self):
        length = self.cleaned_data.get('length')
        if length is not None and length <= 0:
            raise ValidationError("Movie length must be a positive number of minutes.")
        return length


class UserCreateForm(forms.ModelForm):
    password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'admin-input',
            'placeholder': 'Temporary or permanent password',
            'autocomplete': 'new-password'
        })
    )
    password_confirm = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'admin-input',
            'placeholder': 'Confirm password',
            'autocomplete': 'new-password'
        })
    )

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'first_name',
            'last_name',
            'is_active',
            'is_staff',
            'is_superuser'
        ]
        widgets = {
            'username': forms.TextInput(attrs={'class': 'admin-input', 'placeholder': 'Unique username'}),
            'email': forms.EmailInput(attrs={'class': 'admin-input', 'placeholder': 'name@example.com'}),
            'first_name': forms.TextInput(attrs={'class': 'admin-input', 'placeholder': 'First name'}),
            'last_name': forms.TextInput(attrs={'class': 'admin-input', 'placeholder': 'Last name'}),
            'is_active': forms.CheckboxInput(attrs={'class': 'admin-checkbox'}),
            'is_staff': forms.CheckboxInput(attrs={'class': 'admin-checkbox'}),
            'is_superuser': forms.CheckboxInput(attrs={'class': 'admin-checkbox'}),
        }

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        password_confirm = cleaned_data.get('password_confirm')

        if password and password_confirm:
            if password != password_confirm:
                self.add_error('password_confirm', "Passwords do not match.")
            else:
                validate_password(password)

        email = cleaned_data.get('email')
        if email and User.objects.filter(email__iexact=email).exists():
            self.add_error('email', "A user with this email address already exists.")

        return cleaned_data

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password'])
        if commit:
            user.save()
        return user


class UserEditForm(forms.ModelForm):
    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'first_name',
            'last_name',
            'is_active',
            'is_staff',
            'is_superuser',
        ]
        widgets = {
            'username': forms.TextInput(attrs={'class': 'admin-input', 'placeholder': 'Username'}),
            'email': forms.EmailInput(attrs={'class': 'admin-input', 'placeholder': 'name@example.com'}),
            'first_name': forms.TextInput(attrs={'class': 'admin-input', 'placeholder': 'First name'}),
            'last_name': forms.TextInput(attrs={'class': 'admin-input', 'placeholder': 'Last name'}),
            'is_active': forms.CheckboxInput(attrs={'class': 'admin-checkbox'}),
            'is_staff': forms.CheckboxInput(attrs={'class': 'admin-checkbox'}),
            'is_superuser': forms.CheckboxInput(attrs={'class': 'admin-checkbox'}),
        }

    def __init__(self, *args, current_admin=None, **kwargs):
        self.current_admin = current_admin
        super().__init__(*args, **kwargs)

    def clean(self):
        cleaned_data = super().clean()
        is_active = cleaned_data.get('is_active')
        is_superuser = cleaned_data.get('is_superuser')

        # Prevent admin from deactivating or demoting themselves
        if self.current_admin and self.instance.pk == self.current_admin.pk:
            if is_active is False:
                raise ValidationError("Security Rule: You cannot deactivate your own active superuser account.")
            if is_superuser is False:
                raise ValidationError("Security Rule: You cannot remove your own superuser privileges.")

        # Prevent removing superuser privilege if this is the only remaining superuser
        if self.instance.is_superuser and is_superuser is False:
            remaining_superusers = User.objects.filter(is_superuser=True).exclude(pk=self.instance.pk).count()
            if remaining_superusers == 0:
                raise ValidationError("Security Rule: Cannot demote the last remaining superuser in the database.")

        # Email uniqueness check (excluding self)
        email = cleaned_data.get('email')
        if email:
            existing = User.objects.filter(email__iexact=email).exclude(pk=self.instance.pk)
            if existing.exists():
                self.add_error('email', "A user with this email address already exists.")

        return cleaned_data


class AdminUserPasswordForm(forms.Form):
    new_password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'admin-input',
            'placeholder': 'Enter new password',
            'autocomplete': 'new-password'
        })
    )
    confirm_password = forms.CharField(
        widget=forms.PasswordInput(attrs={
            'class': 'admin-input',
            'placeholder': 'Confirm new password',
            'autocomplete': 'new-password'
        })
    )

    def __init__(self, *args, user=None, **kwargs):
        self.target_user = user
        super().__init__(*args, **kwargs)

    def clean(self):
        cleaned_data = super().clean()
        new_password = cleaned_data.get('new_password')
        confirm_password = cleaned_data.get('confirm_password')

        if new_password and confirm_password:
            if new_password != confirm_password:
                self.add_error('confirm_password', "Passwords do not match.")
            else:
                validate_password(new_password, user=self.target_user)

        return cleaned_data


class AdminProfileForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['username', 'email', 'first_name', 'last_name']
        widgets = {
            'username': forms.TextInput(attrs={'class': 'admin-input', 'placeholder': 'Username'}),
            'email': forms.EmailInput(attrs={'class': 'admin-input', 'placeholder': 'Email address'}),
            'first_name': forms.TextInput(attrs={'class': 'admin-input', 'placeholder': 'First name'}),
            'last_name': forms.TextInput(attrs={'class': 'admin-input', 'placeholder': 'Last name'}),
        }

    def clean_email(self):
        email = self.cleaned_data.get('email')
        if email:
            existing = User.objects.filter(email__iexact=email).exclude(pk=self.instance.pk)
            if existing.exists():
                raise ValidationError("This email address is already in use by another account.")
        return email

    def clean_username(self):
        username = self.cleaned_data.get('username')
        if username:
            existing = User.objects.filter(username__iexact=username).exclude(pk=self.instance.pk)
            if existing.exists():
                raise ValidationError("This username is already taken.")
        return username
