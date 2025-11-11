//------------------------------------------------------- Rendez-vous V2 ----------------------------------------------------------------

    const arrayRdv = JSON.parse(localStorage.getItem('appointments') || '[]');

function listRendezVous() {

    if (!list_Rendez_Vous) return;
    else {
        table_List()
    }        
}
listRendezVous()

function table_List(){
    const list_Rendez_Vous = document.querySelector("#tbody");
    list_Rendez_Vous.innerHTML = arrayRdv.map(item => `
        <tr class="border-b shadow-md text-md md:text-xl lg:text-2xl text-blue-950 bg-blue-300">
            <td class="px-1 md:px-3 lg:px-6 py-3">${item.fullName}</td>
            <td class="px-1 md:px-3 lg:px-6 py-3">${item.doctor}</td>
            <td class="px-1 md:px-3 lg:px-6 py-3">${item.date}</td>
            <td class="px-1 md:px-3 lg:px-6 py-3">${item.time}</td>
            
            <td class="flex flex-col md:flex-row bg-amber-400 items-center md:justify-evenly">
                <div class="flex items-center justify-center cursor-pointer w-8 h-14">
                    <div onclick="accept_Rdv(${item.id})" class="hover:-rotate-180 w-full h-8 rounded-full bg-center bg-no-repeat bg-[url('../../v1Medicare/images/verifie.png')] duration-500 transition-all"></div>
                </div>

                <div id="status"
                class="flex items-center justify-center  w-20 text-sm font-bold hover:font-extrabold duration-600 transition-all">${item.status_rdv}</div>

                <div onclick="refus(${item.id})"
                class="flex items-center justify-center cursor-pointer  w-8 h-14">
                <div class="hover:rotate-180 w-full h-8 rounded-full bg-center bg-no-repeat bg-[url('../../v1Medicare/images/supprimer.png')] duration-500 transition-all"></div>
                </div>
        </td>
        </tr>
    `).join('');
}   
let status_rdv = document.getElementById("status")

function refus(id_State){
    if (confirm('Êtes-vous sûr de Rejeter ce rendez-vous ?')) {
        appointments = arrayRdv.map(apt =>
            apt.id === id_State ? { ...apt, status_rdv: 'refusé' } : apt
        );
        localStorage.setItem('appointments', JSON.stringify(appointments));
        status_rdv = JSON.parse(localStorage.appointments)
        table_List()
    }

}


function accept_Rdv(id_State){
    if (confirm('Êtes-vous sûr de Accepté ce rendez-vous ?')) {
        appointments = arrayRdv.map(apt =>
            apt.id === id_State ? { ...apt, status_rdv: 'accepté' } : apt
        );
        localStorage.setItem('appointments', JSON.stringify(appointments));
        table_List()
    }

}