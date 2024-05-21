// src/main/java/com/yourpackage/viewmodels/TaskViewModel.kt
package com.yourpackage.viewmodels

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.yourpackage.models.Task

class TaskViewModel : ViewModel() {

    private val _tasks = MutableLiveData<List<Task>>()
    val tasks: LiveData<List<Task>> = _tasks

    fun addTask(task: Task) {
        val currentList = _tasks.value.orEmpty()
        _tasks.value = currentList + task
    }

    fun removeTask(taskId: String) {
        val currentList = _tasks.value.orEmpty()
        _tasks.value = currentList.filter { it.id != taskId }
    }

    fun updateTask(updatedTask: Task) {
        val currentList = _tasks.value.orEmpty()
        _tasks.value = currentList.map { if (it.id == updatedTask.id) updatedTask else it }
    }
}
