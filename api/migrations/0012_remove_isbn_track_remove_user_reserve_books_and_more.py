# Generated by Django 4.2.11 on 2024-03-16 11:01

import datetime
import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0011_alter_activebooks_date_of_issue_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="isbn",
            name="track",
        ),
        migrations.RemoveField(
            model_name="user",
            name="reserve_books",
        ),
        migrations.AddField(
            model_name="book",
            name="issued_code",
            field=models.CharField(default="0", max_length=9),
        ),
        migrations.AddField(
            model_name="book",
            name="reserved_code",
            field=models.CharField(default="0", max_length=9),
        ),
        migrations.AddField(
            model_name="user",
            name="fine",
            field=models.IntegerField(
                default=0, validators=[django.core.validators.MinValueValidator(0)]
            ),
        ),
        migrations.AddField(
            model_name="user",
            name="reserved_books",
            field=models.ManyToManyField(
                blank=True, null=True, related_name="reserved_books", to="api.book"
            ),
        ),
        migrations.AddField(
            model_name="user",
            name="valid_till",
            field=models.DateField(default=datetime.date(2024, 3, 16)),
        ),
        migrations.AlterField(
            model_name="activebooks",
            name="date_of_issue",
            field=models.DateField(default=datetime.date(2024, 3, 16)),
        ),
        migrations.AlterField(
            model_name="activebooks",
            name="date_of_return",
            field=models.DateField(default=datetime.date(2024, 3, 16)),
        ),
        migrations.AlterField(
            model_name="activebooks",
            name="due_date",
            field=models.DateField(default=datetime.date(2024, 3, 16)),
        ),
        migrations.AlterField(
            model_name="activebooks",
            name="max_date_of_reserve",
            field=models.DateField(default=datetime.date(2024, 3, 16)),
        ),
        migrations.AlterField(
            model_name="book",
            name="last_issue_date",
            field=models.DateField(default=datetime.date(2024, 3, 16)),
        ),
        migrations.RemoveField(
            model_name="user",
            name="active_books",
        ),
        migrations.DeleteModel(
            name="AllotISBN",
        ),
        migrations.DeleteModel(
            name="ISBN",
        ),
        migrations.AddField(
            model_name="user",
            name="active_books",
            field=models.ManyToManyField(
                blank=True, null=True, related_name="active_books", to="api.book"
            ),
        ),
    ]
