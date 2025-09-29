// frontend/script.js
const API_URL = 'http://localhost:5000/api/tasks';
const taskList = document.getElementById('task-list');
const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');

// ----------------------------------------------------
// 1. عرض المهام (READ)
// ----------------------------------------------------

// دالة لإنشاء عنصر قائمة (LI) للمهمة
const createTaskElement = (task) => {
    const listItem = document.createElement('li');
    listItem.classList.add('task-item');
    // إضافة كلاس 'completed' إذا كانت المهمة مكتملة
    if (task.completed) {
        listItem.classList.add('completed');
    }
    
    // وضع مُعرّف المهمة في HTML للوصول إليه لاحقاً
    listItem.dataset.id = task._id;

    listItem.innerHTML = `
        <span>${task.title}</span>
        <div class="task-actions">
            <button class="complete-btn" data-id="${task._id}">
                ${task.completed ? 'إلغاء الإكمال' : 'إكمال'}
            </button>
            <button class="delete-btn" data-id="${task._id}">حذف</button>
        </div>
    `;
    return listItem;
};

// جلب وعرض كل المهام
const fetchTasks = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Failed to fetch tasks');
        }
        const tasks = await response.json();

        taskList.innerHTML = ''; // تفريغ القائمة قبل الإضافة
        tasks.forEach(task => {
            const taskElement = createTaskElement(task);
            taskList.appendChild(taskElement);
        });

    } catch (error) {
        console.error('Error:', error);
        alert('فشل في جلب المهام. تأكد من أن الخادم يعمل (http://localhost:5000).');
    }
};

// ----------------------------------------------------
// 2. إضافة مهمة (CREATE)
// ----------------------------------------------------
taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = taskInput.value.trim();
    if (!title) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to add task');
        }

        taskInput.value = ''; // مسح حقل الإدخال
        fetchTasks(); // إعادة جلب القائمة لتحديث الواجهة

    } catch (error) {
        console.error('Error adding task:', error);
        alert(`فشل في إضافة المهمة: ${error.message}`);
    }
});


// ----------------------------------------------------
// 3. التحديث والحذف (UPDATE & DELETE)
// ----------------------------------------------------
taskList.addEventListener('click', async (e) => {
    const taskId = e.target.dataset.id;
    if (!taskId) return;

    // معالجة زر الإكمال (UPDATE)
    if (e.target.classList.contains('complete-btn')) {
        const listItem = e.target.closest('.task-item');
        // قراءة الحالة الحالية من DOM
        const isCompleted = listItem.classList.contains('completed');
        const newCompletedStatus = !isCompleted;

        try {
            const response = await fetch(`${API_URL}/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                // إرسال الحالة المعكوسة
                body: JSON.stringify({ completed: newCompletedStatus }),
            });

            if (response.ok) {
                // تحديث الواجهة دون إعادة جلب كل شيء (تحسين)
                listItem.classList.toggle('completed', newCompletedStatus);
                e.target.textContent = newCompletedStatus ? 'إلغاء الإكمال' : 'إكمال';
            } else {
                throw new Error('Failed to update task');
            }
        } catch (error) {
            console.error('Error updating task:', error);
            alert('فشل في تحديث حالة المهمة.');
        }

    } 
    
    // معالجة زر الحذف (DELETE)
    else if (e.target.classList.contains('delete-btn')) {
        if (!confirm('هل أنت متأكد من حذف هذه المهمة؟')) {
            return;
        }

        try {
            const response = await fetch(`${API_URL}/${taskId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // إزالة العنصر من الواجهة مباشرة
                e.target.closest('.task-item').remove();
            } else {
                throw new Error('Failed to delete task');
            }
        } catch (error) {
            console.error('Error deleting task:', error);
            alert('فشل في حذف المهمة.');
        }
    }
});

// ----------------------------------------------------
// 4. الإطلاق (Initial Load)
// ----------------------------------------------------

// جلب المهام عند تحميل الصفحة لأول مرة
fetchTasks();