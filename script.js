function showTimeline(guruId, startDate) {
    const start = new Date(startDate);
    const today = new Date();
    const timeline = [
        { title: 'TMT', date: start },
        { title: 'Masa Training', date: addMonths(start, 6) },
        { title: 'GTT', date: addMonths(start, 6) },
        { title: 'Masuk Dapodik', date: addYears(start, 1 + 6 / 12) },
        { title: 'GTY', date: addYears(start, 2 + 6 / 12) },
        { title: 'Pengusulan NUPTK', date: addYears(start, 2 + 6 / 12) }
    ];

    let timelineHtml = '<div class="timeline">';
    timeline.forEach((event, index) => {
        const isCurrent = today >= event.date && (index === timeline.length - 1 || today < timeline[index + 1].date);
        const duration = getDuration(event, index, timeline);
        timelineHtml += `
            <div class="event ${isCurrent ? 'current' : ''}">
                <div class="date">${formatDate(event.date)}</div>
                <div class="marker"></div>
                <div class="content">
                    <h2>${event.title}</h2>
                    ${duration ? `<div class="duration">${duration}</div>` : ''}
                </div>
            </div>
        `;
    });
    timelineHtml += '</div>';

    document.getElementById('timeline-container').innerHTML = timelineHtml;
}

function addMonths(date, months) {
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
}

function addYears(date, years) {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + years);
    return result;
}

function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
}

function getDuration(event, index, timeline) {
    if (event.title === 'GTY') {
        return '2 tahun';
    } else if (index < timeline.length - 1) {
        const diffTime = Math.abs(timeline[index + 1].date - event.date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffMonths = Math.floor(diffDays / 30);
        return `${diffMonths} bulan`;
    }
    return '';
}
