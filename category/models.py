from django.db import models

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=200)
    color = models.CharField(max_length=7, null=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "Category"
        verbose_name_plural = "Categories"

    def __str__(self):
        return f"{str(self.name)}"
