// src/main/java/com/yourpackage/models/Task.kt
package com.yourpackage.models

data class Task(
    val id: String,
    val title: String,
    val description: String,
    val priority: Int,
    val dueDate: Long,
    val isCompleted: Boolean
)
