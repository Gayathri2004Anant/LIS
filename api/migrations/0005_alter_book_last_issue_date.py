# Generated by Django 4.2.11 on 2024-03-13 16:46

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0004_book_available_book_last_issue_date_book_reserved"),
    ]

    operations = [
        migrations.AlterField(
            model_name="book",
            name="last_issue_date",
            field=models.DateField(default=datetime.date(2024, 3, 13)),
        ),
    ]