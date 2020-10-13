

//Ecoute de l'élément formu par l'id , ajout un event listener et axecution de la function asyncrones searchByCity
document.getElementById('formu').addEventListener('submit', searchByCity);



async function searchByCity(event){
    //Fucntion permetant de rechercher par ville dans l'api de la métropole lilloise
    event.preventDefault(); //pemet de suprimer le comportement par défault

    const ville = document.getElementById('search').value;
    //Try catch permettant de catch les erreur en cas d'echec du try
    try{
        document.getElementById('table-body').innerHTML= "";
        const response = await fetch(`https://opendata.lillemetropole.fr/api/records/1.0/search/?dataset=vlille-realtime&q=${ville}&facet=libelle&facet=nom&facet=commune&facet=etat&facet=nbvelosdispo&facet=nbplacesdispo`)
        
        if(response.ok){//Test de la réponse si elle est true
            
            const fields = await response.json();
            fields.records.forEach(element =>
                newLign(element.fields.commune,element.fields.nom,element.fields.etat,element.fields.nbvelosdispo,element.fields.nbplacesdispo)
        );
        }
        else{
            //Ici on gères la cas d'erreur
            let error = response.status;
            switch(true){
                
                case (error<400):
                    alert(`L'api à été déplacé`);
                    break;
                case (error==429):
                    alert('Trop de requètes ont été émises, veuillez réssayer plus tard')
                    break;
                case (error<500):
                    alert('Une erreur est survenue coté client, vérifier votre connexion internet ou vos paramètres');
                    break;
                case(error<600):
                    alert('Une erreur est survenue coté serveur, veuillez réessayer plus tard');
                    break;

            }
        }
        
        

    }
    catch(e) {
        console.error(e);
    }
}

function newLign(commune,nom,etat,nbVeloDispo,nbPlaceDispo){
    
    //Création d'une nouvelle ligne avec tout les élément nécessaire 

    const body=document.getElementById('table-body');
    const lign=document.createElement('tr');
    body.appendChild(lign);
    lign.innerHTML+=`<td>${commune}</td>`;
    lign.innerHTML+=`<td>${nom}</td>`;
    lign.innerHTML+=`<td value='${etat}' class='etat'>${etat}</td>`;
    lign.innerHTML+=`<td value='${nbVeloDispo}' class='nbvelo'>${nbVeloDispo}</td>`;
    lign.innerHTML+=`<td>${nbPlaceDispo}</td>`;
}