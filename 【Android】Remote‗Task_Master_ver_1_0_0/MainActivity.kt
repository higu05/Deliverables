// src/main/java/com/yourpackage/MainActivity.kt
package com.yourpackage

import android.os.Bundle
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.yourpackage.adapters.TaskAdapter
import com.yourpackage.remotetaskmaster.R
import com.yourpackage.viewmodels.TaskViewModel

class MainActivity : AppCompatActivity() {

    private val taskViewModel: TaskViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val taskRecyclerView: RecyclerView = findViewById(R.id.taskRecyclerView)
        taskRecyclerView.layoutManager = LinearLayoutManager(this)

        taskViewModel.tasks.observe(this) { tasks ->
            taskRecyclerView.adapter = TaskAdapter(tasks)
        }

        // Add some sample tasks
        taskViewModel.addTask(Task("1", "Task 1", "Description 1", 1, System.currentTimeMillis(), false))
        taskViewModel.addTask(Task("2", "Task 2", "Description 2", 2, System.currentTimeMillis(), false))
    }
}
