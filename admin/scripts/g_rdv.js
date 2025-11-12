//------------------------------------------------------- Rendez-vous V2 ----------------------------------------------------------------

// function listRendezVous() {

//     if (!list_Rendez_Vous) return;
//     else {
//         table_List()
//     }        
// }

// *********** filtre par rdv accepted *********
const green = document.querySelector(".acceptRdvBtn");
green.addEventListener('click', () => {

    const arrayRdv = JSON.parse(localStorage.getItem('appointments') || '[]')
    const Green = arrayRdv.filter(item => item.statusRdv === "accepté")
    htmlTable(Green)
})

// *********** filtre par rdv refuse *********
const red = document.querySelector(".refuseRdvBtn");
red.addEventListener('click', () => {

    const arrayRdv = JSON.parse(localStorage.getItem('appointments') || '[]')
    const Red = arrayRdv.filter(item => item.statusRdv === "refusé")
    htmlTable(Red)
})



// *********** filtre par rdv Traitement *********
// const Traitement = document.querySelector(".statusRdv");
// Traitement.addEventListener('click', () => {

//     const arrayRdv = JSON.parse(localStorage.getItem('appointments') || '[]')
//     const arrayTraitment = arrayRdv.filter(item => item.statusRdv === "Traitement")
//     htmlTable(arrayTraitment)
// })


let listDisponibilite = document.querySelector('.disponible')
listDisponibilite.addEventListener('click', () => {
    listDisponibilite.innerHTML = `
<div class="statusDispoDoctor w-48 text-blue-950 absolute top-1 -left-10 bg-gray-400 border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
    <button type="button" onclick="Exist()" class="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
        <svg class="w-3 h-3 me-2.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
        </svg>
        Disponible
    </button>
    <button type="button" onclick="noExist()" class="relative inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white">
        <svg class="w-3 h-3 me-2.5" aria-hidden="true" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"/>
        </svg>
        No disponible
    </button>
</div>

`
})


function Exist(){
    
    const arrayRdv = JSON.parse(localStorage.getItem('appointments') || '[]')
    console.log(arrayRdv.joursdispo)

    const today = new Date().toISOString().split('T')[0]


    const disponible = arrayRdv.filter(item => item.joursdispo == today)
    htmlTable(disponible)
}

function noExist(){
    
    const arrayRdv = JSON.parse(localStorage.getItem('appointments') || '[]')
    let statusDispoDoctor = document.querySelector('.statusDispoDoctor')
    statusDispoDoctor.classList.toggle('hidden')
    const today = new Date().toISOString().split('T')[0]

    const disponible = arrayRdv.filter(item => item.joursdispo < today)
    htmlTable(disponible)
}
function htmlTable(table) {
    const listRendezVous = document.querySelector("#tbody")
    listRendezVous.innerHTML = table.map(item => `
        <tr class="border-b-8 text-lg text-blue-950 bg-blue-600/50">
            <td class="px-1 md:px-3 lg:px-6 py-3">${item.doctor}</td>
            <td class="px-1 md:px-3 lg:px-6 py-3">${item.fullName}</td>
            <td class="px-1 md:px-3 lg:px-6 py-3">${item.day}</td>
            
            <td class="flex flex-col md:flex-row items-center md:justify-evenly">
                <p class="flex items-center justify-center cursor-pointer w-8 h-14">
                    <button onclick="acceptRdv(${item.id})"class="hover:-rotate-180 w-full h-8 rounded-full bg-center bg-no-repeat bg-[url('../../images/verifie.png')] duration-500"></button>
                </p>

                <p class="statusRdv flex items-center justify-center  w-20 text-sm font-extrabold duration-600 transition-all">${item.statusRdv}</p>

                <p onclick="refusRdv(${item.id})" class="flex items-center justify-center cursor-pointer  w-8 h-14">
                    <button class="hover:rotate-180 w-full h-8 rounded-full bg-center bg-no-repeat bg-[url('../../images/supprimer.png')] duration-500"></button>
                </p>
            </td>
        </tr>
    `).join('');
}

function listRendezVous() {
    const arrayRdv = JSON.parse(localStorage.getItem('appointments') || '[]')
    htmlTable(arrayRdv)
}
// let statusRdv = document.getElementById("status") nothing with that, i call him by id.statusRdv that aleardy passed it works with click the button

//********** rdv  refused *************/
function refusRdv(idState) {
    const arrayRdv = JSON.parse(localStorage.getItem('appointments') || '[]')

    if (confirm('Êtes-vous sûr de Rejeter ce rendez-vous ?')) {
        let refusAppointments = arrayRdv.map(apt =>
            apt.id === idState ? { ...apt, statusRdv: 'refusé' } : apt
        );
        localStorage.setItem('appointments', JSON.stringify(refusAppointments));
        listRendezVous()
    }

}

//************ Rendez-vous accepted *************/
function acceptRdv(idState) {
    const arrayRdv = JSON.parse(localStorage.getItem('appointments') || '[]')

    if (confirm('Êtes-vous sûr de Accepté ce rendez-vous ?')) {
        let acceptAppointments = arrayRdv.map(apt =>
            apt.id === idState ? { ...apt, statusRdv: 'accepté' } : apt
        );
        localStorage.setItem('appointments', JSON.stringify(acceptAppointments))
        listRendezVous()
    }

}

listRendezVous()