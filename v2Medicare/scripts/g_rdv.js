//------------------------------------------------------- Rendez-vous V2 ----------------------------------------------------------------

function listRendezVous() {
    // let rdv_Section = document.querySelector('#rdv')

    // const rdv_Ttable = document.createElement(`
    //     <table class="w-full text-sm text-left rtl:text-right">
    //     </table>
    //     `)
    // const header_Table = document.createElement(`
    //     <thead class="text-xs text-gray-700 bg-green-300 uppercase shadow-md">
    //         <tr class="shadow-md">
    //             <th scope="col" class="px-1 md:px-4 py-4">
    //                 Doctor
    //             </th>
    //             <th scope="col" class="px-1 md:px-4 py-4">
    //                 Patient
    //             </th>
    //             <th scope="col" class="px-1 md:px-4 py-4">
    //                 Date
    //             </th>
    //             <th scope="col" class="px-1 md:px-4 py-4">
    //                 Heure
    //             </th>
    //             <th scope="col" class="px-1 md:px-4 py-4">
    //                 Status
    //             </th>
    //         </tr>
    //     </thead>
    //     `)
    // const Body_table = document.createElement(`
    //     <tbody id="tbody">

    //         </tbody>`)
    
    const list_Rendez_Vous = document.querySelector("#tbody");
    const array = JSON.parse(localStorage.getItem('appointments') || '[]');

    if (!list_Rendez_Vous) return;
    else {
        list_Rendez_Vous.innerHTML = array.map(item => `
        <tr class="border-b shadow-md text-md md:text-xl lg:text-2xl text-blue-950 bg-blue-300">
            <td class="px-1 md:px-3 lg:px-6 py-3">${item.fullName}</td>
            <td class="px-1 md:px-3 lg:px-6 py-3">${item.doctor}</td>
            <td class="px-1 md:px-3 lg:px-6 py-3">${item.date}</td>
            <td class="px-1 md:px-3 lg:px-6 py-3">${item.time}</td>
            <td class="flex flex-col md:flex-row items-center justify-between md:justify-evenly">
                <div onclick="acceptAppointment(${item.id})"
                class="bg-center bg-no-repeat bg-[url('../../v1Medicare/images/verifie.png')]
                flex items-center justify-center p-1 cursor-pointer w-8 h-14 hover:scale-110 duration-500 transition-all"></div>
                <div onclick="refuseAppointment(${item.id})"
                class="bg-center bg-no-repeat bg-[url('../../v1Medicare/images/supprimer.png')]
                flex items-center justify-center p-1 cursor-pointer w-8 h-14 hover:scale-110 duration-500 transition-all"></div>
        </td>
        </tr>
    `).join('');
    }


}


listRendezVous()

const closeThisNav = document.querySelector("#openClose");
const navDashbord = document.querySelector(".navDashbord");

closeThisNav.addEventListener('click', () => {
    navDashbord.classList.toggle('hidden');
    closeThisNav.classList.toggle('-rotate-90');

});

function refuseAppointment(id) {
  let appointments = getAppointments();
  if (confirm('Êtes-vous sûr de refuser ce rendez-vous ?')) {
    appointments = appointments.map(apt =>
      apt.id === id ? { ...apt, status: 'refusé' } : apt
    );
    localStorage.setItem('appointments', JSON.stringify(appointments));
    listRendezVous();
  }
}

function acceptAppointment(id) {
  let appointments = getAppointments();
  if (confirm('Êtes-vous sûr d’accepter ce rendez-vous ?')) {
    appointments = appointments.map(apt =>
      apt.id === id ? { ...apt, status: 'accepté' } : apt
    );
    localStorage.setItem('appointments', JSON.stringify(appointments));
    listRendezVous();
  }
}