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

    const file = fileInput.files[0];
    formData.append('file', file);
    if (title) formData.append('title', title);
    if (description) formData.append('description', description);

    try {
        const response = await fetch('/api/images/upload', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const image = await response.json();
            // Create a temporary URL for immediate preview
            const tempUrl = URL.createObjectURL(file);
            addImageToGrid(image, tempUrl);
            alert('Image uploaded successfully!');
            closeUploadModal();
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
            const image = await response.json();
            updateImageInGrid(image);
            alert('Image updated successfully!');
            closeEditImageModal();
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
            removeImageFromGrid(id);
            alert('Image deleted successfully!');
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
    const email = document.getElementById('aboutEmail').value;
    const phone = document.getElementById('aboutPhone').value;
    const additionalContact = document.getElementById('aboutAdditionalContact').value;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (email) formData.append('email', email);
    if (phone) formData.append('phone', phone);
    if (additionalContact) formData.append('additionalContact', additionalContact);

    try {
        const response = await fetch('/api/about', {
            method: 'PUT',
            body: formData
        });

        if (response.ok) {
            const aboutData = await response.json();
            updateAboutSection(aboutData);
            alert('About section updated successfully!');
            closeEditAboutModal();
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
            const entry = await response.json();
            if (id) {
                updateCvEntryInGrid(entry);
            } else {
                addCvEntryToGrid(entry);
            }
            alert('CV entry saved successfully!');
            closeCvModal();
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
            removeCvEntryFromGrid(id);
            alert('CV entry deleted successfully!');
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

// ==================== DOM MANIPULATION HELPERS ====================
function addImageToGrid(image, tempUrl = null) {
    const grid = document.getElementById('portfolioGrid');
    const imageItem = createImageElement(image, tempUrl);
    grid.appendChild(imageItem);

    // Enable dragging if in edit mode
    if (document.body.classList.contains('edit-mode')) {
        imageItem.setAttribute('draggable', 'true');
        imageItem.addEventListener('dragstart', handleDragStart);
        imageItem.addEventListener('dragend', handleDragEnd);
        imageItem.addEventListener('dragover', handleDragOver);
        imageItem.addEventListener('drop', handleDrop);
        imageItem.addEventListener('dragleave', handleDragLeave);
    }
}

function createImageElement(image, tempUrl = null) {
    const div = document.createElement('div');
    div.className = 'portfolio-item';
    div.setAttribute('data-id', image.id);

    const inEditMode = document.body.classList.contains('edit-mode');
    const overlayDisplay = inEditMode ? '' : 'display: none;';

    // Use tempUrl if provided (for immediate preview), otherwise use filepath
    const mediaUrl = tempUrl || image.filepath;

    // Check if it's a video file
    const isVideo = image.filename && (
        image.filename.toLowerCase().endsWith('.mp4') ||
        image.filename.toLowerCase().endsWith('.webm') ||
        image.filename.toLowerCase().endsWith('.mov') ||
        image.filename.toLowerCase().endsWith('.avi')
    );

    const mediaHtml = isVideo ?
        `<video src="${mediaUrl}" autoplay loop muted playsinline></video>` :
        `<img src="${mediaUrl}" alt="${image.title || ''}" loading="lazy">`;

    div.innerHTML = `
        <div class="image-wrapper">
            ${mediaHtml}
            <div class="image-overlay edit-only" style="${overlayDisplay}">
                <button class="overlay-btn edit-btn" onclick="editImage(${image.id})">✎ Edit</button>
                <button class="overlay-btn delete-btn" onclick="deleteImage(${image.id})">🗑 Delete</button>
            </div>
        </div>
        ${image.title || image.description ? `
        <div class="image-info">
            ${image.title ? `<h3>${image.title}</h3>` : ''}
            ${image.description ? `<p>${image.description}</p>` : ''}
        </div>
        ` : ''}
    `;

    return div;
}

function updateImageInGrid(image) {
    const imageItem = document.querySelector(`[data-id="${image.id}"]`);
    if (imageItem) {
        const titleEl = imageItem.querySelector('.image-info h3');
        const descEl = imageItem.querySelector('.image-info p');

        if (titleEl) titleEl.textContent = image.title || '';
        if (descEl) descEl.textContent = image.description || '';

        // If there's no image-info div but we now have title/description, create it
        if (!imageItem.querySelector('.image-info') && (image.title || image.description)) {
            const imageWrapper = imageItem.querySelector('.image-wrapper');
            const infoDiv = document.createElement('div');
            infoDiv.className = 'image-info';
            if (image.title) {
                const h3 = document.createElement('h3');
                h3.textContent = image.title;
                infoDiv.appendChild(h3);
            }
            if (image.description) {
                const p = document.createElement('p');
                p.textContent = image.description;
                infoDiv.appendChild(p);
            }
            imageWrapper.after(infoDiv);
        }
    }
}

function removeImageFromGrid(id) {
    const imageItem = document.querySelector(`[data-id="${id}"]`);
    if (imageItem) {
        imageItem.remove();
    }
}

function updateAboutSection(aboutData) {
    const titleEl = document.querySelector('.editable-title');
    const contentEl = document.querySelector('.editable-content');

    if (titleEl) titleEl.textContent = aboutData.title;
    if (contentEl) {
        // Replace newlines with <p> tags for proper formatting
        const paragraphs = aboutData.content.split('\n\n').filter(p => p.trim());
        contentEl.innerHTML = paragraphs.map(p => `<p>${p.replace(/\n/g, '<br>')}</p>`).join('');
    }

    // Update or create contact section
    let contactSection = document.querySelector('.contact-info');

    if (aboutData.email || aboutData.phone || aboutData.additionalContact) {
        if (!contactSection) {
            contactSection = document.createElement('div');
            contactSection.className = 'contact-info';
            document.querySelector('.about-content').appendChild(contactSection);
        }

        let contactHtml = '<h3>Contact</h3><div class="contact-details">';

        if (aboutData.email) {
            contactHtml += `<p class="contact-item"><strong>Email:</strong> <a href="mailto:${aboutData.email}">${aboutData.email}</a></p>`;
        }

        if (aboutData.phone) {
            contactHtml += `<p class="contact-item"><strong>Phone:</strong> <a href="tel:${aboutData.phone}">${aboutData.phone}</a></p>`;
        }

        if (aboutData.additionalContact) {
            contactHtml += `<div class="contact-item additional-contact">${aboutData.additionalContact.replace(/\n/g, '<br>')}</div>`;
        }

        contactHtml += '</div>';
        contactSection.innerHTML = contactHtml;
    } else if (contactSection) {
        contactSection.remove();
    }
}

function addCvEntryToGrid(entry) {
    const grid = document.getElementById('cvGrid');
    const entryElement = createCvEntryElement(entry);

    // Append at the end - user can drag to reorder
    grid.appendChild(entryElement);

    // Enable dragging if in edit mode
    if (document.body.classList.contains('edit-mode')) {
        entryElement.setAttribute('draggable', 'true');
        entryElement.addEventListener('dragstart', handleDragStart);
        entryElement.addEventListener('dragend', handleDragEnd);
        entryElement.addEventListener('dragover', handleDragOver);
        entryElement.addEventListener('drop', handleDrop);
        entryElement.addEventListener('dragleave', handleDragLeave);
    }
}

function createCvEntryElement(entry) {
    const div = document.createElement('div');
    div.className = 'cv-entry';
    div.setAttribute('data-id', entry.id);

    const inEditMode = document.body.classList.contains('edit-mode');
    const actionsDisplay = inEditMode ? 'display: flex !important;' : 'display: none;';

    div.innerHTML = `
        <div class="cv-year">${entry.year}</div>
        <div class="cv-details">
            <h3>${entry.title}</h3>
            ${entry.description ? `<p>${entry.description}</p>` : ''}
            <span class="cv-type">${entry.entryType}</span>
            <div class="cv-actions edit-only" style="${actionsDisplay}">
                <button class="edit-btn-small" onclick="editCvEntry(${entry.id})">✎ Edit</button>
                <button class="delete-btn-small" onclick="deleteCvEntry(${entry.id})">🗑 Delete</button>
            </div>
        </div>
    `;

    return div;
}

function updateCvEntryInGrid(entry) {
    const entryElement = document.querySelector(`#cvGrid [data-id="${entry.id}"]`);
    if (entryElement) {
        const yearEl = entryElement.querySelector('.cv-year');
        const titleEl = entryElement.querySelector('.cv-details h3');
        const descEl = entryElement.querySelector('.cv-details p');
        const typeEl = entryElement.querySelector('.cv-type');

        yearEl.textContent = entry.year;
        titleEl.textContent = entry.title;
        typeEl.textContent = entry.entryType;

        if (descEl && entry.description) {
            descEl.textContent = entry.description;
        } else if (!descEl && entry.description) {
            const p = document.createElement('p');
            p.textContent = entry.description;
            titleEl.after(p);
        } else if (descEl && !entry.description) {
            descEl.remove();
        }
    }
}

function removeCvEntryFromGrid(id) {
    const entryElement = document.querySelector(`#cvGrid [data-id="${id}"]`);
    if (entryElement) {
        entryElement.remove();
    }
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

// ==================== DRAG AND DROP ====================
let draggedElement = null;
let draggedType = null;

function initializeDragAndDrop() {
    // Initialize portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.setAttribute('draggable', 'false');
    });

    // Initialize CV entries
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
    });

    // Enable dragging for CV entries
    document.querySelectorAll('.cv-entry').forEach(entry => {
        entry.setAttribute('draggable', 'true');
        entry.addEventListener('dragstart', handleDragStart);
        entry.addEventListener('dragend', handleDragEnd);
        entry.addEventListener('dragover', handleDragOver);
        entry.addEventListener('drop', handleDrop);
        entry.addEventListener('dragleave', handleDragLeave);
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
    });

    // Disable dragging for CV entries
    document.querySelectorAll('.cv-entry').forEach(entry => {
        entry.setAttribute('draggable', 'false');
        entry.removeEventListener('dragstart', handleDragStart);
        entry.removeEventListener('dragend', handleDragEnd);
        entry.removeEventListener('dragover', handleDragOver);
        entry.removeEventListener('drop', handleDrop);
        entry.removeEventListener('dragleave', handleDragLeave);
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
        }
    } catch (error) {
        console.error('Error saving image order:', error);
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
        }
    } catch (error) {
        console.error('Error saving CV order:', error);
    }
}

// Update toggleEditMode to enable/disable drag and drop
const originalToggleEditMode = toggleEditMode;
toggleEditMode = function() {
    originalToggleEditMode();

    if (editMode) {
        enableDragAndDrop();
    } else {
        disableDragAndDrop();
    }
};

// Initialize on page load
initializeDragAndDrop();