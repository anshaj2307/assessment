const totalSeats = 80;
const seatsPerRow = 7;
const seatMap = Array.from({ length: 80 }, (_, index) => ({ id: index + 1, booked: false }));

document.getElementById('bookSeats').addEventListener('click', () => {
    const seatCount = parseInt(document.getElementById('seatCount').value);
    const bookedSeats = bookSeats(seatCount);
    displaySeats();
    document.getElementById('output').innerText = bookedSeats.length > 0 ? `Booked Seats: ${bookedSeats.join(', ')}` : 'Not enough seats available';
});

function bookSeats(count) {
    const booked = [];
    for (let i = 0; i < seatMap.length; i++) {
        if (!seatMap[i].booked) {
            let canBook = true;
            for (let j = 0; j < count; j++) {
                if (i + j >= seatMap.length || seatMap[i + j].booked || (j >= seatsPerRow && (i % seatsPerRow) + j >= seatsPerRow)) {
                    canBook = false;
                    break;
                }
            }
            if (canBook) {
                for (let j = 0; j < count; j++) {
                    seatMap[i + j].booked = true;
                    booked.push(seatMap[i + j].id);
                }
                break;
            }
        }
    }
    return booked;
}

function displaySeats() {
    const seatMapDiv = document.getElementById('seatMap');
    seatMapDiv.innerHTML = '';
    seatMap.forEach(seat => {
        const seatDiv = document.createElement('div');
        seatDiv.className = `seat ${seat.booked ? 'booked' : ''}`;
        seatDiv.innerText = seat.id;
        seatMapDiv.appendChild(seatDiv);
    });
}