//------------------------------------------------------- Rendez-vous V2 ----------------------------------------------------------------

// function listRendezVous() {

//     if (!list_Rendez_Vous) return;
//     else {
//         table_List()
//     }        
// }

function htmlTable(table){
     const listRendezVous = document.querySelector("#tbody")
    listRendezVous.innerHTML = table.map(item => `
        <tr class="border-b-8 text-lg text-blue-950 bg-blue-600/50">
            <td class="px-1 md:px-3 lg:px-6 py-3">${item.fullName}</td>
            <td class="px-1 md:px-3 lg:px-6 py-3">${item.doctors}</td>
            <td class="px-1 md:px-3 lg:px-6 py-3">${item.date}</td>
            <td class="px-1 md:px-3 lg:px-6 py-3">${item.time}</td>
            
            <td class="flex flex-col md:flex-row items-center md:justify-evenly">
                <p class="flex items-center justify-center cursor-pointer w-8 h-14">
                    <button onclick="acceptRdv(${item.id})" class="hover:-rotate-180 w-full h-8 rounded-full bg-center bg-no-repeat bg-[url('../../v1Medicare/images/verifie.png')] duration-500"></button>
                </p>

                <p class="flex items-center justify-center  w-20 text-sm font-extrabold duration-600 transition-all">${item.statusRdv}</p>

                <p onclick="refusRdv(${item.id})" class="flex items-center justify-center cursor-pointer  w-8 h-14">
                    <button class="hover:rotate-180 w-full h-8 rounded-full bg-center bg-no-repeat bg-[url('../../v1Medicare/images/supprimer.png')] duration-500"></button>
                </p>
            </td>
        </tr>
    `).join('');
}

function listRendezVous(){
    const arrayRdv = JSON.parse(localStorage.getItem('appointments') || '[]')
    htmlTable(arrayRdv)
}
// let statusRdv = document.getElementById("status") nothing with that, i call him by id.statusRdv that aleardy passed it works with click the button

//********** rdv  refused *************/
function refusRdv(idState){
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
function acceptRdv(idState){
    const arrayRdv = JSON.parse(localStorage.getItem('appointments') || '[]')

    if (confirm('Êtes-vous sûr de Accepté ce rendez-vous ?')) {
       let  acceptAppointments = arrayRdv.map(apt =>
            apt.id === idState ? { ...apt, statusRdv: 'accepté' } : apt
        );
        localStorage.setItem('appointments', JSON.stringify(acceptAppointments))
        listRendezVous()
    }
    
}

// *********** filtre par rdv accepted *********
const green = document.querySelector(".green")
green.addEventListener('click', ()=>{
    const arrayRdv = JSON.parse(localStorage.getItem('appointments') || '[]')

    
    let Green = arrayRdv.filtre(item=> item.statusRdv == 'accepté')
    htmlTable(Green)

})

listRendezVous()


