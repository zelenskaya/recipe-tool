const searchPageTitle=document.getElementById("search-page-title");
const query = new URLSearchParams(location.search).get('q');

function applySearchStrings(){
    document.title = UI.search.metaTitle;
    
    searchPageTitle.textContent = UI.search.pageTitle
     
      .replace("{query}", query);
                        }




applySearchStrings();