let zoomLevel = 1;

function openImageModal(imageSrc, title) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    zoomLevel = 1;
    modalImage.style.transform = `scale(${zoomLevel})`;
    modalImage.src = imageSrc;
    modalImage.alt = title;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

document.addEventListener('wheel', function(e) {
    const modal = document.getElementById('imageModal');
    if (!modal.classList.contains('active')) return;
    e.preventDefault();
    if (e.deltaY < 0) zoomLevel += 0.1;
    else zoomLevel -= 0.1;
    if (zoomLevel < 0.2) zoomLevel = 0.2;
    document.getElementById('modalImage').style.transform = `scale(${zoomLevel})`;
}, { passive: false });

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeImageModal();
});

populateTagFilter();
renderResources(allResources, true);
