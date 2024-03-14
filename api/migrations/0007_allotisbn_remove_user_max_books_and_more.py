# Generated by Django 5.0.3 on 2024-03-14 11:54

import datetime
import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_remove_user_user_id_alter_user_code'),
    ]

    operations = [
        migrations.CreateModel(
            name='AllotISBN',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('lastcupboard', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(24)])),
                ('lastrack', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(4)])),
                ('lastposn', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(9)])),
            ],
        ),
        migrations.RemoveField(
            model_name='user',
            name='max_books',
        ),
        migrations.AlterField(
            model_name='book',
            name='last_issue_date',
            field=models.DateField(default=datetime.date(2024, 3, 14)),
        ),
        migrations.AlterField(
            model_name='user',
            name='type',
            field=models.PositiveSmallIntegerField(blank=True, choices=[(1, 'Undergraduate Student'), (2, 'Postgraduate Student'), (3, 'Research Scholar'), (4, 'Faculty Member'), (5, 'Administrator')], default=0, null=True),
        ),
        migrations.CreateModel(
            name='ActiveBooks',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_of_issue', models.DateField(default=datetime.date(2024, 3, 14))),
                ('date_of_return', models.DateField(default=datetime.date(2024, 3, 14))),
                ('due_date', models.DateField(default=datetime.date(2024, 3, 14))),
                ('max_date_of_reserve', models.DateField(default=datetime.date(2024, 3, 14))),
                ('book', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='book', to='api.book')),
            ],
        ),
        migrations.CreateModel(
            name='ISBN',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cupboardno', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(24)])),
                ('rackno', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(4)])),
                ('position', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(9)])),
                ('track', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='track', to='api.allotisbn')),
            ],
        ),
    ]