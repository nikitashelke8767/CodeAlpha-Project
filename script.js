document.addEventListener('DOMContentLoaded', async () => {
    const events = await fetch('/api/events').then(res => res.json());
    
    const eventList = document.getElementById('eventList');
    const eventSelect = document.getElementById('eventSelect');

    events.forEach(event => {
        const li = document.createElement('li');
        li.textContent = `${event.name} on ${event.date}`;
        eventList.appendChild(li);

        const option = document.createElement('option');
        option.value = event._id;
        option.textContent = event.name;
        eventSelect.appendChild(option);
    });

    const form = document.getElementById('registerForm');
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const eventId = document.getElementById('eventSelect').value;

        const res = await fetch('/api/registrations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, eventId })
        });

        const data = await res.json();
        alert(data.message || 'Registered!');
        form.reset();
    });
});
