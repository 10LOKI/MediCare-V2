//------------------------------------------------------- Rendez-vous V2 ----------------------------------------------------------------
document.querySelector('.bd').innerHTML = `
 <section class="bg-gray-900 w-[100vw] h-[100vh] flex">
        <div class="bg-gray-300 grid grid-flow-col grid-rows-6 w-[300px] h-full px-4 ">
            <a class="row-span-1 w-full h-full  flex justify-center items-center" href="index.html">
                <div class="text-gray-900 text-xl font-bold">MED <span class="font-bold text-blue-500">Care+</span>
                </div>
            </a>
            <nav class="row-start-2 row-end-5 grid grid-rows-5">
                <a href="acceuil.html"
                    class="w-full  h-[80%] text-white flex items-center  text-base bg-gray-900 hover:border-solid rounded-lg hover:text-blue-500 cursor-pointer hover:bg-white hover:rounded-lg shadow-md transition duration-500">
                    <i class="ri-dashboard-horizontal-fill  mx-7"></i> Dashboard
                </a>
                <a href="g_medcins.html"
                    class="w-full  h-[80%] text-white flex items-center  text-base bg-gray-900 hover:border-solid rounded-lg hover:text-blue-500 cursor-pointer hover:bg-white hover:rounded-lg shadow-md transition duration-500">
                    <i class="ri-medicine-bottle-fill mx-7"></i> Medecins
                </a>
                <a href="g_specialites.html"
                    class="w-full  h-[80%] text-white flex items-center  text-base bg-gray-900 hover:border-solid rounded-lg hover:text-blue-500 cursor-pointer hover:bg-white hover:rounded-lg shadow-md transition duration-500">
                    <i class="ri-test-tube-fill mx-7"></i> Specialité
                </a>
                <a href="g_disponibilites.html"
                    class="w-full  h-[80%] text-white flex items-center  text-base bg-gray-900 hover:border-solid rounded-lg hover:text-blue-500 cursor-pointer hover:bg-white hover:rounded-lg shadow-md transition duration-500">
                    <i class="ri-pulse-fill hover:ri-pulse-fill mx-7"></i> Disponibilité
                </a>
                <a href="g_rendez-vous.html"
                    class="w-full  h-[80%] text-white flex items-center  text-base bg-gray-900 hover:border-solid rounded-lg hover:text-blue-500 cursor-pointer hover:bg-white hover:rounded-lg shadow-md transition duration-500">
                    <i class="ri-calendar-fill mx-7"></i> Rendez-vous
                </a>
            </nav>
            <a href="../login.html"
                class="relative top-10 row-start-6 row-end-7 flex text-gray-900  items-center hover:text-blue-500 cursor-pointer w-fit h-fit transition bltext-blue-500 cursor-pointer5 duration-300">
                <i class="ri-logout-circle-r-line text-3xl "></i>
                Log Out
            </a>
        </div>


        <div id="bodySec" class="flex justify-center items-start w-full bg-gray-900 h-full p-6 overflow-auto">
            <div class="bg-gray-400 h-[90%] w-[95%] rounded-lg shadow-sm">
                <!------------------- Section maipulation data RDV ----------------------------------------->
                <div class="@container p-4 ">
                    <div class="flex flex-col lg:flex-row gap-4 mb-6 text-4xl md:text-5xl text-blue-900">
                        <div class="flex flex-col gap-2 ">
                            <div class="text-center text-3xl w-full h-20 bg-indigo-100 border border-indigo-200 rounded-xl p-6 animate-fade-in">+Rendez-vous</div>
                            <div class="flex-1 bg-indigo-100 border border-indigo-200 rounded-xl p-2 pl-4 animate-fade-in">
                                <h2>
                                    Bonjour <br><strong>Mme secretaire</strong>
                                </h2>
                                <span id="montre"
                                    class="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-indigo-800">

                                </span>
                            </div>
                        </div>


                        <div class="relative overflow-x-auto">
                            <table class="w-full text-sm text-left rtl:text-right text-gray-500 rounded-2xl overflow-hidden">
                                <thead class="text-lg text-gray-700 bg-blue-300 w-full h-20 uppercase shadow-md">
                                    <tr class="shadow-md">
                                        <th class="pl-4 pr-2 py-4">
                                            <p class="flex items-center justify-between h-full px-4 py-4">

                                                Doctor
                                                <button class="disponible border w-10 h-10 rounded-full bg-center bg-no-repeat bg-[url('../../images/list.png')] duration-500 transition-all relative"></button>
                                            </p>
                                        </th>
                                        <th scope="col" class="pr-2 pl-4 py-4">
                                            Patient
                                        </th>
                                        <th scope="col" class=" pr-2 pl-4 py-4">
                                            Jour
                                        </th>
                                        <th class="pl-4 pr-2 py-4">
                                            <p
                                                class="flex items-center justify-between w-full h-full px-1  py-2">
                                                <img src="../../images/list.png" alt="accept rendez-vous"
                                                    class="acceptRdvBtn w-8 h-8 bg-green-400 rounded-full duration-500 transition-all cursor-pointer">
                                                Status
                                                <img src="../../images/list.png" alt="refuse rendez-vous"
                                                    class="refuseRdvBtn w-8 h-8 rounded-full bg-red-500 duration-500 transition-all cursor-pointer">
                                            </p>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody id="tbody">

                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>
`
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
listDisponibilite.dataset.name = 'disponibilite'
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