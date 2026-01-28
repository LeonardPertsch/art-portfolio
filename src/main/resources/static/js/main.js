// Global variables
let editMode = false;

// Toggle Edit Mode
function toggleEditMode() {
    editMode = !editMode;
    const editElements = document.querySelectorAll('.edit-only');
    const editModeBtn = document.getElementById('editModeBtn');

    editElements.forEach(el => {
        el.style.display = editMode ? 'block' : 'none';
    });

    editModeBtn.classList.toggle('active', editMode);
    editModeBtn.innerHTML = editMode
        ? '<span id="editModeIcon">✓</span> Exit Edit Mode'
        : '<span id="editModeIcon">✎</span> Edit Mode';

    // Enable/disable drag and drop
    if (editMode) {
        enableDragAndDrop();
    } else {
        disableDragAndDrop();
    }
}

// ============================================
// IMAGE UPLOAD & MANAGEMENT
// ============================================

function openUploadModal() {
    document.getElementById('uploadModal').style.display = 'block';
}

function closeUploadModal() {
    document.getElementById('uploadModal').style.display = 'none';
    document.getElementById('uploadForm').reset();
}

// Handle image upload
document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const fileInput = document.getElementById('imageFile');
    const title = document.getElementById('imageTitle').value;
    const description = document.getElementById('imageDescription').value;

    formData.append('file', fileInput.files[0]);
    formData.append('title', title);
    formData.append('description', description);

    try {
        const response = await fetch('/api/images/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            alert('Image uploaded successfully!');
            closeUploadModal();
            location.reload();
        } else {
            const error = await response.text();
            alert('Upload failed: ' + error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Upload failed: ' + error.message);
    }
});

// Edit image
function editImage(id) {
    // Find the image in the DOM
    const imageItem = document.querySelector(`.portfolio-item[data-id="${id}"]`);
    const title = imageItem.querySelector('.image-info h3')?.textContent || '';
    const description = imageItem.querySelector('.image-info p')?.textContent || '';

    // Populate modal
    document.getElementById('editImageId').value = id;
    document.getElementById('editImageTitle').value = title;
    document.getElementById('editImageDescription').value = description;

    // Show modal
    document.getElementById('editImageModal').style.display = 'block';
}

function closeEditImageModal() {
    document.getElementById('editImageModal').style.display = 'none';
}

// Handle image edit
document.getElementById('editImageForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('editImageId').value;
    const title = document.getElementById('editImageTitle').value;
    const description = document.getElementById('editImageDescription').value;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    try {
        const response = await fetch(`/api/images/${id}`, {
            method: 'PUT',
            body: formData
        });

        if (response.ok) {
            alert('Image updated successfully!');
            closeEditImageModal();
            location.reload();
        } else {
            const error = await response.text();
            alert('Update failed: ' + error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Update failed: ' + error.message);
    }
});

// Delete image
async function deleteImage(id) {
    if (!confirm('Are you sure you want to delete this image?')) {
        return;
    }

    try {
        const response = await fetch(`/api/images/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Image deleted successfully!');
            location.reload();
        } else {
            const error = await response.text();
            alert('Delete failed: ' + error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Delete failed: ' + error.message);
    }
}

// ============================================
// ABOUT SECTION
// ============================================

function editAbout() {
    document.getElementById('editAboutModal').style.display = 'block';
}

function closeEditAboutModal() {
    document.getElementById('editAboutModal').style.display = 'none';
}

// Handle about section update with proper JSON encoding
document.getElementById('editAboutForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('aboutTitle').value;
    const content = document.getElementById('aboutContent').value;
    const email = document.getElementById('aboutEmail').value;
    const phone = document.getElementById('aboutPhone').value;
    const additionalContact = document.getElementById('aboutAdditionalContact').value;

    // Create JSON object
    const data = {
        title: title,
        content: content,
        email: email || null,
        phone: phone || null,
        additionalContact: additionalContact || null
    };

    console.log('Sending about data:', data); // Debug log

    try {
        const response = await fetch('/api/about', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            alert('About section updated successfully!');
            closeEditAboutModal();
            location.reload();
        } else {
            const error = await response.text();
            console.error('Server error:', error);
            alert('Update failed: ' + error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Update failed: ' + error.message);
    }
});

// ============================================
// CV ENTRIES
// ============================================

function openCvModal() {
    document.getElementById('cvModalTitle').textContent = 'Add CV Entry';
    document.getElementById('cvForm').reset();
    document.getElementById('cvEntryId').value = '';
    document.getElementById('cvModal').style.display = 'block';
}

function closeCvModal() {
    document.getElementById('cvModal').style.display = 'none';
}

function editCvEntry(id) {
    // Find the CV entry in the DOM
    const cvEntry = document.querySelector(`.cv-entry[data-id="${id}"]`);
    const year = cvEntry.querySelector('.cv-year')?.textContent || '';
    const title = cvEntry.querySelector('.cv-details h3')?.textContent || '';
    const description = cvEntry.querySelector('.cv-details p')?.textContent || '';
    const type = cvEntry.querySelector('.cv-type')?.textContent || 'EDUCATION';

    // Populate modal
    document.getElementById('cvModalTitle').textContent = 'Edit CV Entry';
    document.getElementById('cvEntryId').value = id;
    document.getElementById('cvYear').value = year;
    document.getElementById('cvTitle').value = title;
    document.getElementById('cvDescription').value = description;
    document.getElementById('cvType').value = type;

    // Show modal
    document.getElementById('cvModal').style.display = 'block';
}

// Handle CV entry submit
document.getElementById('cvForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('cvEntryId').value;
    const year = document.getElementById('cvYear').value;
    const title = document.getElementById('cvTitle').value;
    const description = document.getElementById('cvDescription').value;
    const entryType = document.getElementById('cvType').value;

    const formData = new FormData();
    formData.append('year', year);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('entryType', entryType);

    try {
        const url = id ? `/api/cv/${id}` : '/api/cv';
        const method = id ? 'PUT' : 'POST';

        const response = await fetch(url, {
            method: method,
            body: formData
        });

        if (response.ok) {
            alert('CV entry saved successfully!');
            closeCvModal();
            location.reload();
        } else {
            const error = await response.text();
            alert('Save failed: ' + error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Save failed: ' + error.message);
    }
});

// Delete CV entry
async function deleteCvEntry(id) {
    if (!confirm('Are you sure you want to delete this CV entry?')) {
        return;
    }

    try {
        const response = await fetch(`/api/cv/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('CV entry deleted successfully!');
            location.reload();
        } else {
            const error = await response.text();
            alert('Delete failed: ' + error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Delete failed: ' + error.message);
    }
}

// ============================================
// DRAG AND DROP FUNCTIONALITY
// ============================================

let draggedElement = null;
let draggedType = null;

function initializeDragAndDrop() {
    // Initialize portfolio items as non-draggable
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.setAttribute('draggable', 'false');
    });

    // Initialize CV entries as non-draggable
    document.querySelectorAll('.cv-entry').forEach(entry => {
        entry.setAttribute('draggable', 'false');
    });
}

function enableDragAndDrop() {
    // Enable dragging for portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.setAttribute('draggable', 'true');
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragleave', handleDragLeave);
        item.style.cursor = 'move';
    });

    // Enable dragging for CV entries
    document.querySelectorAll('.cv-entry').forEach(entry => {
        entry.setAttribute('draggable', 'true');
        entry.addEventListener('dragstart', handleDragStart);
        entry.addEventListener('dragend', handleDragEnd);
        entry.addEventListener('dragover', handleDragOver);
        entry.addEventListener('drop', handleDrop);
        entry.addEventListener('dragleave', handleDragLeave);
        entry.style.cursor = 'move';
    });
}

function disableDragAndDrop() {
    // Disable dragging for portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.setAttribute('draggable', 'false');
        item.removeEventListener('dragstart', handleDragStart);
        item.removeEventListener('dragend', handleDragEnd);
        item.removeEventListener('dragover', handleDragOver);
        item.removeEventListener('drop', handleDrop);
        item.removeEventListener('dragleave', handleDragLeave);
        item.style.cursor = 'default';
    });

    // Disable dragging for CV entries
    document.querySelectorAll('.cv-entry').forEach(entry => {
        entry.setAttribute('draggable', 'false');
        entry.removeEventListener('dragstart', handleDragStart);
        entry.removeEventListener('dragend', handleDragEnd);
        entry.removeEventListener('dragover', handleDragOver);
        entry.removeEventListener('drop', handleDrop);
        entry.removeEventListener('dragleave', handleDragLeave);
        entry.style.cursor = 'default';
    });
}

function handleDragStart(e) {
    draggedElement = this;
    draggedType = this.classList.contains('portfolio-item') ? 'image' : 'cv';
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');

    // Remove all drag-over classes
    document.querySelectorAll('.drag-over').forEach(el => {
        el.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }

    // Only allow drop on same type
    const isValidTarget =
        (draggedType === 'image' && this.classList.contains('portfolio-item')) ||
        (draggedType === 'cv' && this.classList.contains('cv-entry'));

    if (isValidTarget && this !== draggedElement) {
        e.dataTransfer.dropEffect = 'move';
        this.classList.add('drag-over');
    }

    return false;
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    this.classList.remove('drag-over');

    if (draggedElement !== this) {
        // Determine if we should insert before or after based on mouse position
        const rect = this.getBoundingClientRect();
        const midpoint = draggedType === 'image'
            ? rect.left + rect.width / 2
            : rect.top + rect.height / 2;

        const mousePos = draggedType === 'image' ? e.clientX : e.clientY;

        if (mousePos < midpoint) {
            this.parentNode.insertBefore(draggedElement, this);
        } else {
            this.parentNode.insertBefore(draggedElement, this.nextSibling);
        }

        // Save new order
        if (draggedType === 'image') {
            saveImageOrder();
        } else {
            saveCvOrder();
        }
    }

    return false;
}

async function saveImageOrder() {
    const grid = document.getElementById('portfolioGrid');
    const items = Array.from(grid.querySelectorAll('.portfolio-item'));
    const imageIds = items.map(item => parseInt(item.getAttribute('data-id')));

    try {
        const response = await fetch('/api/images/reorder', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(imageIds)
        });

        if (!response.ok) {
            console.error('Failed to save image order');
            alert('Failed to save image order');
        }
    } catch (error) {
        console.error('Error saving image order:', error);
        alert('Error saving image order');
    }
}

async function saveCvOrder() {
    const grid = document.getElementById('cvGrid');
    const entries = Array.from(grid.querySelectorAll('.cv-entry'));
    const cvIds = entries.map(entry => parseInt(entry.getAttribute('data-id')));

    try {
        const response = await fetch('/api/cv/reorder', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cvIds)
        });

        if (!response.ok) {
            console.error('Failed to save CV order');
            alert('Failed to save CV order');
        }
    } catch (error) {
        console.error('Error saving CV order:', error);
        alert('Error saving CV order');
    }
}

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// HERO ANIMATION
// ============================================

window.addEventListener('load', () => {
    const letters = document.querySelectorAll('.hero-title .letter');
    letters.forEach((letter, index) => {
        setTimeout(() => {
            letter.style.opacity = '1';
            letter.style.transform = 'translateY(0)';
        }, index * 50);
    });
});

// Close modals on outside click
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Initialize drag and drop on page load
window.addEventListener('DOMContentLoaded', () => {
    initializeDragAndDrop();
});