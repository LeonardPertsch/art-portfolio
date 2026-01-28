// ==================== EDIT MODE ====================
let editMode = false;

function toggleEditMode() {
    editMode = !editMode;
    document.body.classList.toggle('edit-mode', editMode);
    
    const btn = document.getElementById('editModeBtn');
    if (editMode) {
        btn.classList.add('active');
        btn.innerHTML = '<span id="editModeIcon">✓</span> Edit Mode Active';
    } else {
        btn.classList.remove('active');
        btn.innerHTML = '<span id="editModeIcon">✎</span> Edit Mode';
    }
}

// ==================== IMAGE UPLOAD ====================
function openUploadModal() {
    document.getElementById('uploadModal').style.display = 'block';
}

function closeUploadModal() {
    document.getElementById('uploadModal').style.display = 'none';
    document.getElementById('uploadForm').reset();
}

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    const fileInput = document.getElementById('imageFile');
    const title = document.getElementById('imageTitle').value;
    const description = document.getElementById('imageDescription').value;
    
    if (!fileInput.files[0]) {
        alert('Please select an image file');
        return;
    }
    
    formData.append('file', fileInput.files[0]);
    if (title) formData.append('title', title);
    if (description) formData.append('description', description);
    
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
        alert('Upload failed: ' + error.message);
    }
});

// ==================== EDIT IMAGE ====================
function editImage(id) {
    // Get image data from DOM
    const imageItem = document.querySelector(`[data-id="${id}"]`);
    const title = imageItem.querySelector('.image-info h3')?.textContent || '';
    const description = imageItem.querySelector('.image-info p')?.textContent || '';
    
    document.getElementById('editImageId').value = id;
    document.getElementById('editImageTitle').value = title;
    document.getElementById('editImageDescription').value = description;
    document.getElementById('editImageModal').style.display = 'block';
}

function closeEditImageModal() {
    document.getElementById('editImageModal').style.display = 'none';
    document.getElementById('editImageForm').reset();
}

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
        alert('Update failed: ' + error.message);
    }
});

// ==================== DELETE IMAGE ====================
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
        alert('Delete failed: ' + error.message);
    }
}

// ==================== EDIT ABOUT SECTION ====================
function editAbout() {
    document.getElementById('editAboutModal').style.display = 'block';
}

function closeEditAboutModal() {
    document.getElementById('editAboutModal').style.display = 'none';
}

document.getElementById('editAboutForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const title = document.getElementById('aboutTitle').value;
    const content = document.getElementById('aboutContent').value;
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    
    try {
        const response = await fetch('/api/about', {
            method: 'PUT',
            body: formData
        });
        
        if (response.ok) {
            alert('About section updated successfully!');
            closeEditAboutModal();
            location.reload();
        } else {
            const error = await response.text();
            alert('Update failed: ' + error);
        }
    } catch (error) {
        alert('Update failed: ' + error.message);
    }
});

// ==================== CV ENTRIES ====================
function openCvModal() {
    document.getElementById('cvModalTitle').textContent = 'Add CV Entry';
    document.getElementById('cvEntryId').value = '';
    document.getElementById('cvForm').reset();
    document.getElementById('cvModal').style.display = 'block';
}

function closeCvModal() {
    document.getElementById('cvModal').style.display = 'none';
    document.getElementById('cvForm').reset();
}

function editCvEntry(id) {
    const entry = document.querySelector(`#cvGrid [data-id="${id}"]`);
    const year = entry.querySelector('.cv-year').textContent;
    const title = entry.querySelector('.cv-details h3').textContent;
    const description = entry.querySelector('.cv-details p')?.textContent || '';
    const type = entry.querySelector('.cv-type').textContent;
    
    document.getElementById('cvModalTitle').textContent = 'Edit CV Entry';
    document.getElementById('cvEntryId').value = id;
    document.getElementById('cvYear').value = year;
    document.getElementById('cvTitle').value = title;
    document.getElementById('cvDescription').value = description;
    document.getElementById('cvType').value = type;
    document.getElementById('cvModal').style.display = 'block';
}

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
    
    const url = id ? `/api/cv/${id}` : '/api/cv';
    const method = id ? 'PUT' : 'POST';
    
    try {
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
        alert('Save failed: ' + error.message);
    }
});

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
        alert('Delete failed: ' + error.message);
    }
}

// ==================== SMOOTH SCROLLING ====================
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

// ==================== CLOSE MODALS ON OUTSIDE CLICK ====================
window.onclick = function(event) {
    const modals = ['uploadModal', 'editImageModal', 'editAboutModal', 'cvModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// ==================== IMAGE LAZY LOADING ====================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imageObserver.observe(img);
    });
}
