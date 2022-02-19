import * as Auth from '../controller/firebase_auth.js'
import * as Constants from '../model/constant.js'
import * as Elements from './elements.js'
import * as Routes from '../controller/routes.js'
import * as FirebaseController from '../controller/firebase_controller.js'

export function addEventListeners() {
    Elements.menuHome.addEventListener('click', async() => {
        history.pushState(null, null, Routes.routePathname.HOME);
        await home_page();
    });
}

export async function home_page() {
    Elements.root.innerHTML = ``;
    let html = '';

    let petField;

    if (Auth.currentUser != null) {
        petField = await FirebaseController.getPetFieldFromUser(Auth.currentUser.uid);
        html += '<h5 style="text-align: center; padding-top: 10%;">Welcome to the Home Page</h5>';
    }

    if (Auth.currentUser != null && petField =="") {
        html += `
            <div style="text-align: center; justify-content: center; padding-top: 10%;">
            
            <p class="pre-pet">First things first, adopt your first Pomopet!</p>
            </div>

            <button type="button" class="btn btn-secondary pomo-bg-color-dark center-position pre-pet pulse-button" data-bs-toggle="modal" data-bs-target="#modal-pomodoption">
            Adopt A Pet!
            </button>
        `;

        Elements.root.innerHTML += html;

        Elements.formPomodoption.addEventListener('click', async () => {

            const pets = document.getElementsByName('pet');
            var petSelected = 'Bunny';
            document.getElementById('pet-selected').innerHTML = 'Adopt The ' + petSelected + '?';
        
            for(var i = 0; i < pets.length; i++) {
                if(pets[i].checked) {
                    petSelected = pets[i].value;
                    document.getElementById('pet-selected').innerHTML = 'Adopt The ' + petSelected + '?';
                }
            }
        
            await FirebaseController.updatePet(Auth.currentUser.uid, petSelected); 
        
            Utilities.info('Adoption Successful.', `You now own a ${petSelected}!`, Constants.htmlIDs.modalPomodoption);
        });
    }
}
