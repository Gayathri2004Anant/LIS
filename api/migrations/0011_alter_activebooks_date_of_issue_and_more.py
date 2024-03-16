# Generated by Django 4.2.11 on 2024-03-15 15:33

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0010_alter_book_last_issue_date"),
    ]

    operations = [
        migrations.AlterField(
            model_name="activebooks",
            name="date_of_issue",
            field=models.DateField(default=datetime.date(2024, 3, 15)),
        ),
        migrations.AlterField(
            model_name="activebooks",
            name="date_of_return",
            field=models.DateField(default=datetime.date(2024, 3, 15)),
        ),
        migrations.AlterField(
            model_name="activebooks",
            name="due_date",
            field=models.DateField(default=datetime.date(2024, 3, 15)),
        ),
        migrations.AlterField(
            model_name="activebooks",
            name="max_date_of_reserve",
            field=models.DateField(default=datetime.date(2024, 3, 15)),
        ),
        migrations.AlterField(
            model_name="book",
            name="last_issue_date",
            field=models.DateField(default=datetime.date(2024, 3, 15)),
        ),
    ]