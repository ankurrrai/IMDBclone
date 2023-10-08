
var latestHindi=['Rocky Aur Rani Kii Prem Kahaani','kantara ','Omg 2','sita ramam','gadar 2']
var comedyMoviesList=['central Intelligence','Hera Pheri','Welcome','Rush Hour 2','Phir Hera Pheri']
var hollywoodMoviesList=['Oppenheimer','Barbie','American Pie','Fifty shades of grey','wrong turn 6']

// let myFavListlocal = JSON.parse(localStorage.getItem("myFavourite")) || [];
myFavListlocal=[]
var fixedMoviestitleIdList=[]


// function updtaLocalStorage() {
//     localStorage.setItem("myFavourite", JSON.stringify(myFavListlocal))
// }



function updateFixedMovies(category,movietitle,idtype,i){
    
    let div=document.createElement('div');
    fetch(`https://www.omdbapi.com/?t=${movietitle}&apikey=473824b6`)
    .then(function(response) {
        return response.json()
    }).then(function (data) {
        let id=Date.now().toString()+'_'+idtype+i
        div.innerHTML=`
                    <a class="click-description" href="#movie-description-section" style="background-image: url( ${data.Poster});"></a>
                    
                    <span style="margin-top: 10px; margin-bottom: 5px;">
                        <span style="display: flex;justify-content: space-between ;">
                            <span><i class="fa-solid fa-star" style="color: yellow;"></i><span> ${data.imdbRating}</span></span>
                            <span class="button-fav" style="cursor: pointer;"><i class="fa-solid fa-heart button-fav-inner"></i></span>
                        </span>
                        
                    </span>
                    
        

                    <span style="text-align: center;">
                      <a class="click-description" href="#movie-description-section"><h4>${data.Title}</h4></a>
                    </span>
        `
        div.setAttribute('class','genere-content')
        div.setAttribute('id',idtype)
        div.setAttribute('id',id)
        category.append(div)
        let fixedMoviestitleID={
            'Title':data.Title,
            'Id':id
        }
        fixedMoviestitleIdList.push(fixedMoviestitleID)
    })
    .catch( function (error){
        console.log('Error',error)  
    })
}

// Fixed Movies
var bollywoodcategory=document.getElementById('bolloywood-category');
var comedyCategory=document.getElementById('comedy-category');
var hollywoodCategory=document.getElementById('hollywood-category');

function addmore(category) {
    let div=document.createElement('div');
    div.innerHTML=`
                    <a href="#search-section"><i class="fa-solid fa-angle-right"></i></a>

        `
        div.setAttribute('class','genere-content')
        category.append(div)
}

function fixedMovies() {
    
    for (i=0;i<latestHindi.length;i++) {
        let movietitle=latestHindi[i]
        updateFixedMovies(bollywoodcategory,movietitle,'hindi_',i)
    }
    // 

    for (i=0;i<comedyMoviesList.length;i++) {
        let movietitle=comedyMoviesList[i]
        updateFixedMovies(comedyCategory,movietitle,'comedy_',i)
    }

    for (i=0;i<hollywoodMoviesList.length;i++) {
        let movietitle=hollywoodMoviesList[i]
        updateFixedMovies(hollywoodCategory,movietitle,'eng_',i)
    }
}


// favorite logic started

// var favortieMoviesList=[];
var favortieMoviesList;
favortieMoviesList=myFavListlocal
// renederfavitems();

var favbutton=document.getElementsByClassName("button-fav-inner")
var favCategory=document.getElementById('fav-catgeory')
// var favIcon=document.getElementById('fav-icon');

// for normal icon

if (favortieMoviesList.length==0){
    document.getElementById('fav-catgeory-header').style.display='none'
} else{
    document.getElementById('fav-catgeory-header').style.display='block'
}

function renederfavitems(){
    if (favortieMoviesList.length==0){
        document.getElementById('fav-catgeory-header').style.display='none'
        return
    } else{
        document.getElementById('fav-catgeory-header').style.display='block'
    }
    favCategory.innerHTML=''
    for (let i=0;i<favortieMoviesList.length;i++) {
        let newfavitem={}
        newfavitem=favortieMoviesList[i]
        let div=document.createElement('div');
        div.innerHTML=`
                    <a class="click-description" href="#movie-description-section"></a>
                    
                    <span style="margin-top: 10px; margin-bottom: 5px;">
                        <span style="display: flex;justify-content: space-between ;">
                            <span><i class="fa-solid fa-star" style="color: yellow;"></i><span> ${newfavitem.imdbRating}</span></span>
                            <span class="button-fav" style="cursor: pointer;"><i class="fa-solid fa-heart button-fav-inner"></i></span>
                        </span>
                        
                    </span>
                    
        

                    <span style="text-align: center;">
                      <a class="click-description" href="#movie-description-section"><h4>${newfavitem.Title}</h4></a>
                    </span>
        `
        div.setAttribute('class','genere-content')
        div.setAttribute('id','fav-' + newfavitem.id)
        div.children[0].style.backgroundImage=newfavitem.poster
        div.children[1].children[0].children[1].style.color='red'
        favCategory.append(div)
    }
}

function addMovies(newfavitem){
    if (newfavitem) {
        favortieMoviesList.push(newfavitem);
        renederfavitems()
    }
    

}

function deletemovies(movieid){
    const newMovieList=favortieMoviesList.filter(function (newfavitem) {
        return newfavitem.Title!=movieid;
    })
    favortieMoviesList=newMovieList;
    renederfavitems()


}


function favtItemUpdation(e){

    let movieid=(e.target.parentElement.parentElement.parentElement.parentElement.id)
    let targetMovietitle=e.target.parentElement.parentElement.parentElement.nextElementSibling.children[0].childNodes[0].innerHTML
    
    if (movieid.split('-').length==1){
        movieid=movieid.split('-')[0]
    }else {
        movieid=movieid.split('-')[1]
    }

    movieid=movieid.split('&')[0]
    

    const newMovieList=favortieMoviesList.filter(function (newfavitem) {
        return newfavitem.id==movieid;
    })

    const newMovieList_Title=favortieMoviesList.filter(function (newfavitem) {
        return newfavitem.Title==targetMovietitle;
    })

    if (newMovieList==0 && newMovieList_Title==0){
        let newfavitem={
            'Title' : e.target.parentElement.parentElement.parentElement.nextElementSibling.children[0].childNodes[0].innerHTML,
            'poster':e.target.parentElement.parentElement.parentElement.parentElement.children[0].style.backgroundImage,
            'imdbRating':Number(e.target.parentElement.parentElement.children[0].children[1].innerHTML),
            'id':movieid
        }
        if (document.getElementById(movieid+'&serach')!=null) {
            document.getElementById(movieid+'&serach').children[1].children[0].children[1].style.color='red'
        } else {
            document.getElementById(movieid).children[1].children[0].children[1].style.color='red'
        }
        if (document.getElementById('result-catgeory').childElementCount!=0) {
            if (targetMovietitle.toUpperCase()==(document.getElementById('result-catgeory').children[0].children[2].children[0].children[0].innerHTML).toUpperCase()) {
                document.getElementById(document.getElementById('result-catgeory').children[0].id).children[1].children[0].children[1].style.color='red'
            }
        }
        

        addMovies(newfavitem);

    }else {
        
        if (document.getElementById('fav-' + movieid)!=null) {
            document.getElementById('fav-' + movieid).children[1].children[0].children[1].style.color=''
        }

        if (document.getElementById(movieid)!=null) {
            document.getElementById(movieid).children[1].children[0].children[1].style.color=''
        }

        if (document.getElementById(movieid+'&serach')!=null) {
            document.getElementById(movieid+'&serach').children[1].children[0].children[1].style.color=''
        }

        for (i=0;i<fixedMoviestitleIdList.length;i++) {
            let movietitle=fixedMoviestitleIdList[i].Title
            if (movietitle.toUpperCase()==targetMovietitle.toUpperCase()) {
                document.getElementById(fixedMoviestitleIdList[i].Id).children[1].children[0].children[1].style.color=''
            }
                
        }

        if (targetMovietitle.toUpperCase()==(document.getElementById('result-catgeory').children[0].children[2].children[0].children[0].innerHTML).toUpperCase()) {
            document.getElementById(document.getElementById('result-catgeory').children[0].id).children[1].children[0].children[1].style.color=''
        }

        deletemovies(targetMovietitle);
        
        
    }

    // check the fav list with fixed
    for (i=0;i<fixedMoviestitleIdList.length;i++) {
        let movietitle=fixedMoviestitleIdList[i].Title
        for (j=0;j<favortieMoviesList.length;j++) {
            if (movietitle.toUpperCase()==(favortieMoviesList[j].Title).toUpperCase()) {
                document.getElementById(fixedMoviestitleIdList[i].Id).children[1].children[0].children[1].style.color='red'
            }
            
        }
    }

    
    // myFavListlocal=favortieMoviesList   
    
    
    
}
function initappend() {
    for (let i=0;i<favbutton.length;i++) {

        favbutton[i].addEventListener('click',favtItemUpdation);
    
    }

    setTimeout(initappend,0)
}

function main() {
    fixedMovies()
    setTimeout(initappend,1000)
    
}

main()


// Search part started

function enableFunction(e) {
    // close-result
    if (e.target.id=="close-result") {
        document.getElementById("search-result").style.display="none"
        document.getElementById("fav-result").style.display="block"
        document.getElementById("fixed-result").style.display="block"
        document.getElementById("serach-content-section").style.display="flex"
        document.getElementById("movie-description-section").style.display="none"

    }else if (e.target.id=="IMDB" || e.target.id=="Home" || e.target.id=="Home-bottom") {
        document.getElementById("search-result").style.display="none"
        document.getElementById("fav-result").style.display="block"
        document.getElementById("fixed-result").style.display="block"
        document.getElementById("serach-content-section").style.display="flex"
        document.getElementById("movie-description-section").style.display="none"

    } else if (e.target.id=="Favourites" || e.target.id=="Favourites-bottom" || e.target.id=="Favourites-serach-content") {
        document.getElementById("search-result").style.display="none"
        document.getElementById("fav-result").style.display="block"
        document.getElementById("fixed-result").style.display="none"
        document.getElementById("serach-content-section").style.display="flex"
        document.getElementById("movie-description-section").style.display="none"

    }
}

function disablFunction(e) {
    
    if (e.target.id=="serach") {
        document.getElementById("search-result").style.display="block"
        document.getElementById("fav-result").style.display="none"
        document.getElementById("fixed-result").style.display="none"
        document.getElementById("serach-content-section").style.display="flex"
        document.getElementById("movie-description-section").style.display="none"

    } else if(e.target.className=='click-description') {
        document.getElementById("serach-content-section").style.display="none"
        document.getElementById("movie-description-section").style.display="flex"
    }else if(e.target.parentElement.className=='click-description') {
        document.getElementById("serach-content-section").style.display="none"
        document.getElementById("movie-description-section").style.display="flex"
    }
    
}

function updateResult(category,movietitle,idtype,colortype){
    
    let div=document.createElement('div');
    fetch(`https://www.omdbapi.com/?t=${movietitle}&apikey=473824b6`)
    .then(function(response) {
        return response.json()
    }).then(function (data) {
        category.innerHTML=''
        if (data.Title!=undefined) {

            div.innerHTML=`
                        <a href="#movie-description-section" class="click-description" style="background-image: url( ${data.Poster});"></a>
                        
                        <span style="margin-top: 10px; margin-bottom: 5px;">
                            <span style="display: flex;justify-content: space-between ;">
                                <span><i class="fa-solid fa-star" style="color: yellow;"></i><span> ${data.imdbRating}</span></span>
                                <span class="button-fav" style="cursor: pointer;"><i class="fa-solid fa-heart button-fav-inner"></i></span>
                            </span>
                            
                        </span>
                        
            

                        <span style="text-align: center;">
                        <a class="click-description" href="#movie-description-section"><h4>${data.Title}</h4></a>
                        </span>
            `
            div.setAttribute('class','genere-content')
            if (colortype=='red') {
                div.setAttribute('id',idtype)
            }else {
                div.setAttribute('id',Date.now().toString()+'_'+idtype)
            }
            category.append(div)
            if (colortype=='red') {
                document.getElementById(idtype).children[1].children[0].children[1].style.color=colortype
            }
            
        } else {
            div.innerHTML=`<h1 style="color: red;"> ${movietitle.toUpperCase()} Not Found...</h1>`
            category.append(div)
        }
    })
    .catch( function (error){
        console.log('Error',error)  
    })
}

function serachContent(e) {
    let toserach=search.value
    let serachid='&serach'

    let Favlist=favortieMoviesList.filter(function (newfavitem) {
    return (newfavitem.Title).toUpperCase()==toserach.toUpperCase()
    })

    if (Favlist.length!=0) {

        if (toserach!="") {
            updateResult(document.getElementById("result-catgeory"),toserach,Favlist[0].id+serachid,'red')
            search.value=''
        } else {
            document.getElementById("result-catgeory").innerHTML=""
            alert('Please provide the movie name!')
        }
        
    } else {
        if (toserach!="") {
            updateResult(document.getElementById("result-catgeory"),toserach,serachid,'')
            search.value=''
        } else {
            document.getElementById("result-catgeory").innerHTML=""
            alert('Please provide the movie name!')
        }
    }

    
}

function suggestionSerachContent(e) {
    let toserach=search.value
    let serachid='&serach'

    let Favlist=favortieMoviesList.filter(function (newfavitem) {
    return (newfavitem.Title).toUpperCase()==toserach.toUpperCase()
    })

    if (Favlist.length!=0) {

        if (toserach!="") {
            document.getElementById("result-catgeory").innerHTML=""
            updateResult(document.getElementById("result-catgeory"),toserach,Favlist[0].id+serachid,'red')
            if (e.key=="Enter") {
                search.value=''
            }
        } else if(toserach=="" && e.key=="Enter") {
            document.getElementById("result-catgeory").innerHTML=""
            alert('Please provide the movie name!')
        }

    } else {

        if (toserach!="") {
            document.getElementById("result-catgeory").innerHTML=""
            updateResult(document.getElementById("result-catgeory"),toserach,serachid,'')
            if (e.key=="Enter") {
                search.value=''
            }
        } else if(toserach=="" && e.key=="Enter") {
            document.getElementById("result-catgeory").innerHTML=""
            alert('Please provide the movie name!')
        }

    }
    
    
}

var search=document.getElementById('serach')
document.addEventListener('click',disablFunction);
document.addEventListener('click',enableFunction);

document.addEventListener('keyup',suggestionSerachContent);
document.getElementById("search-button").addEventListener('click',serachContent)



// Movie render

function updateMovieDescriptionSection(movietitle){
    
    let div=document.createElement('div');
    fetch(`https://www.omdbapi.com/?t=${movietitle}&apikey=473824b6`)
    .then(function(response) {
        return response.json()
    }).then(function (data) {
        div.innerHTML=`
                
                    <br>
                    <div id="movie-description-header" class="color-white">
                        <h1>${data.Title}</h1>
                    </div>
                    <br>

                    <div id="movie-image">
                        <a href="#" style="background-image: url( ${data.Poster});"></a>
                        <br>
                        <div id="movie-details">
                        <div>
                            <span>
                            <span><i class="fa-solid fa-star" style="color: yellow;"></i>&nbsp; ${data.imdbRating}/10</span>
                        </span>
                        </div>

                        <div>
                            <span><h5>${data.Genre}</h5></span>
                        </div>

                        <div>
                            <span><h5>Released :  ${data.Released}</h5></span>
                        </div>

                        <div>
                            <span><h5>${data.Plot}</h5></span>
                        </div>

                        <div>
                            <span><h5>Director : ${data.Director}</h5></span>
                        </div>
                        <div>
                            <span><h5>Writer : ${data.Writer}</h5></span>
                        </div>
                        <div>
                            <span><h5>Actors : ${data.Actors}</h5></span>
                        </div>
                        <div>
                            <span><h5>Language : ${data.Language}</h5></span>
                        </div>
                        
                    </div>
                    </div>
        `
        div.setAttribute('id','movie-description')
        document.getElementById('movie-description-section').append(div)
    })
    .catch( function (error){
        console.log('Error',error)  
    })
}

function movieDescription (e) {
    let movietitle=''
    if (e.target.style.backgroundImage=='') {
        movietitle=e.target.innerHTML
    } else {
        movietitle=e.target.parentElement.children[2].children[0].children[0].innerHTML
    }
    document.getElementById('movie-description-section').innerHTML=''
    updateMovieDescriptionSection(movietitle)
    
}


var clickDdescription=document.getElementsByClassName('click-description')

function movieDescriptionClick() {
    for (let i=0;i<clickDdescription.length;i++) {

        clickDdescription[i].addEventListener('click',movieDescription);
        
    }

    setTimeout(movieDescriptionClick,0)
}

setTimeout(movieDescriptionClick,1000)