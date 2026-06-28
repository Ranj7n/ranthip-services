document.addEventListener('DOMContentLoaded', () => {
    const addPassengerBtn = document.getElementById('add-passenger');
    const passengerContainer = document.getElementById('passenger-container');
    const form = document.getElementById('tatkalForm');

    // Logic to add multiple passengers dynamically
    addPassengerBtn.addEventListener('click', () => {
        const newRow = document.createElement('div');
        newRow.className = 'passenger-row';
        newRow.innerHTML = `
            <input type="text" name="passName[]" placeholder="Passenger Name" required>
            <input type="number" name="passAge[]" placeholder="Age" required>
            <select name="berthPref[]">
                <option value="">Berth Pref</option>
                <option value="Lower">Lower</option>
                <option value="Middle">Middle</option>
                <option value="Upper">Upper</option>
            </select>
        `;
        passengerContainer.appendChild(newRow);
    });

    // Form Submission Logic
    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevents the page from refreshing
        
        // Change button text and disable it to prevent double-clicking
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting Request...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';

        const formData = new FormData(form);
        
        // IMPORTANT: Replace this placeholder with your live Google Apps Script Web App URL later
        const scriptURL = 'https://script.google.com/macros/s/AKfycbzUIiV4Rtt9P1FP3MkKlkRJ3Ip2gIugwSSF6FnSYGbkfarwaUvjs6veRct0ATi7kNBzHg/exec'; 

        // Simulated submission for local testing (runs if you haven't added your URL yet)
        if (scriptURL === 'YOUR_GOOGLE_SCRIPT_URL_HERE') {
            setTimeout(() => {
                alert('TEST MODE: Booking request submitted successfully! \n\n(Remember to add your Google Script URL to script.js to receive real data).');
                form.reset();
                
                // Reset passenger rows to just one
                passengerContainer.innerHTML = `
                    <div class="passenger-row">
                        <input type="text" name="passName[]" placeholder="Passenger Name" required>
                        <input type="number" name="passAge[]" placeholder="Age" required>
                        <select name="berthPref[]">
                            <option value="">Berth Pref</option>
                            <option value="Lower">Lower</option>
                            <option value="Middle">Middle</option>
                            <option value="Upper">Upper</option>
                        </select>
                    </div>
                `;
                
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            }, 1500);
            return;
        }

        // The actual code that sends data to your Google Sheet
        fetch(scriptURL, { method: 'POST', body: formData})
            .then(response => {
                alert('Booking request submitted successfully! We will contact you shortly via WhatsApp.');
                form.reset();
                
                // Reset passenger rows
                passengerContainer.innerHTML = `
                    <div class="passenger-row">
                        <input type="text" name="passName[]" placeholder="Passenger Name" required>
                        <input type="number" name="passAge[]" placeholder="Age" required>
                        <select name="berthPref[]">
                            <option value="">Berth Pref</option>
                            <option value="Lower">Lower</option>
                            <option value="Middle">Middle</option>
                            <option value="Upper">Upper</option>
                        </select>
                    </div>
                `;

                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            })
            .catch(error => {
                console.error('Error!', error.message);
                alert('There was an error submitting your form. Please try again or message us directly on WhatsApp.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
            });
    });
});