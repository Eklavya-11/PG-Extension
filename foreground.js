/*
::::OTHER SYSTEMS::::
*/

/* Hunting System (Changes Encounter's styling for Shiny, custom hunting List) */
var pokemonList;

chrome.storage.local.get('pokemonHuntList', function(data) {
  let pokemonHtml = data.pokemonHuntList;
  const regex = /data-pokemon="(\w+)"/g; // we only need the pokemon name, not html tags
  pokemonList = [];
  let match;
  while ((match = regex.exec(pokemonHtml)) !== null) {
    pokemonList.push(match[1]);
  }
  console.log("[Extension] Your Hunting List: " + pokemonList);
});

$('#mws-explore-encounter').bind("DOMSubtreeModified", function() {
  let foundPokemon = false;
  for (let i = 0; i < pokemonList.length; i++) {
    if ($(this).text().toLowerCase().indexOf(pokemonList[i]) > -1) {
      foundPokemon = true;
      break;
    }
  }
  if (foundPokemon) {
    $(this).css('color', '#7DF9FF');
    document.getElementById("btnBattle").style.backgroundColor = "blue";
    new Audio('https://www.pokemongods.com/audio/hit.mp3').play();
  } else {
    $(this).css('color', '#ffffff');
  }
});

$('#mws-explore-encounter').bind("DOMSubtreeModified",function(){ // Shiny
  if ($(this).text().toLowerCase().indexOf("shiny") > -1)
  {
        $(this).css('color', ' #ff80ff');
        document.getElementById("btnBattle").style.backgroundColor = "magenta";
      new Audio('https://www.pokemongods.com/audio/hit.mp3').play();
  }
  else
  {
              $(this).css('color', '#ffffff');

  }
});

/* Map Location System */
let mapCode_data = ["None", "Grassy Patch", "Bluegum Town", "Route 1", "Bluegum Caves", "Route 2", "Darlinghurst Town", "Darlinghurst Ranch", "Route 3", "Route 3 Secret Grotto", "Route 4", "Newpine Town", "Route 5", "Grayview Cave", "Grayview Cave Secret Grotto", "Oldpine Town", "Oldpine Jailfield", "Diglett Run Cave", "South Grayview Cave", "Route 6", "Eastbourne Shore", "West Eastbourne Farmlands", "Northwest Eastbourne Farmlands", "East Eastbourne Farmlands", "Grand Garden Maze", "Route 7", "Sunrock Desert A", "Sunrock Desert B", "Sunrock Desert C", "Sunrock Desert D", "Sunrock Desert E", "Route 8", "Route 8 Secret Grotto", "Route 9", "Route 10", "Route 11", "Safari Zone 1", "Safari Zone 2", "Safari Zone 3", "Frost Cave", "Route 12", "Dorocoast Town Dock", "Shipwreck Sands", "SeaFairy Forest", "Seafloor Cave", "Blackfell Island Forest", "Blackfell Island Graveyard", "Blackfell Caverns", "Blackfell Caverns F2", "Blackfell Caverns F3", "Blackfell Caverns F4", "Blackfell Caverns Secret Grotto", "Blackfell Caverns F1-A", "Route 15", "Route 16", "Sand Temple", "Route 13", "Route 14", "Route 14 Secret Grotto", "Route 17", "Route 18", "Route 18 Secret Grotto", "Route 19", "Undersea Cave", "North Grayview Cave", "Trail to Onderblade", "Onderblade Mines", "Willowsteen Forest", "Bluegum Underground", "Bluegum Depths", "Sorcerer's Castle Grounds", "Grayview City Outskirts", "Agent Ruins", "Ashfall Forest", "Route 200", "Route 201", "Honeybun Farm", "Sandmarsh Rainforest", "Sandmarsh Pond", "Honeybun Meadow", "Dorocoast Lava Chamber", "Sunrock Fields A1", "Sunrock Fields A2", "Sunrock Fields A3", "Sunrock Fields B1", "Sunrock Fields B2", "Sunrock Fields B3", "Sunrock Fields C2", "Sunrock Fields C3", "Sunrock Fields E2", "Twin River Island", "Sandmarsh Swamp", "East Twin River Peaks", "West Twin River Peaks", "Deserted Island", "Deserted Shore" ];
let location_data = {
  "None": "Select a map",
  "Grassy Patch" : "Caterpie (Common)", 
	"Bluegum Town" : "Cherubi (Common), Scyther (Rare), Cubone (Uncommon), Shinx (Uncommon), Sentret (Common), Starly (Common), Abra (Common), Meditite (Rare), Poochyena (Common), Snubbull (Common), Wurmple (Common), Jigglypuff (Common)", 
	"Route 1" : "Ralts (Common), Seedot (Common), Pineco (Common), Heracross (Common), Sableye (Uncommon), Gulpin (Rare), Venonat (Common), Nincada (Common), Sunkern (Uncommon), Pidove (Uncommon), Blitzle (Uncommon), Kricketot (Common), Sewaddle (Rare), Wooper (Common), Ekans (Common), Rattata (Common), Whismur (Common), Trapinch (Uncommon), Yanma (Uncommon)", 
	"Bluegum Caves" : "Geodude (Common), Rhyhorn (Rare), Zubat (Common), Onix (Uncommon)", 
	"Route 2" : "Dunsparce (Common), Girafarig (Common), Magnemite (Uncommon), Mareep (Common), Paras (Uncommon), Surskit (Common), Budew (Rare), Lotad (Common), Corphish (Common), Wingull (Rare), Stunky (Common), Bronzor (Common), Shellos (Common), Munchlax (Rare), Jigglypuff (Common), Vulpix (Uncommon), Oddish (Common), Diglett (Uncommon), Slakoth (Common), Wurmple (Common), Slugma (Common), Teddiursa (Rare)", 
	"Darlinghurst Town" : "Doduo (Common), Spinarak (Uncommon), Tangela (Rare), Machop (Rare), Weedle (Common), Bellsprout (Common), Krabby (Rare), Taillow (Common), Spoink (Common), Murkrow (Uncommon), Ponyta (Common), Aipom (Common), Hoothoot (Common), Exeggcute (Common)", 
	"Darlinghurst Ranch" : "Venonat (Rare), Dunsparce (Common), Abra (Common), Bellsprout (Common), Exeggcute (Common), Rattata (Common)", 
	"Route 3" : "Hoppip (Uncommon), Spearow (Common), Voltorb (Uncommon), Grimer (Rare), Pidgey (Common), Natu (Uncommon), Swinub (Common), Plusle (Common)", 
	"Route 3 Secret Grotto" : "Pidgey (Common), Rattata (Common), Dratini (Grotto Rare), Gible (Grotto Rare)", 
	"Route 4" : "Meowth (Common), Sandshrew (Common), Drowzee (Uncommon), Mankey (Rare), Magikarp (Common), Poliwag (Uncommon), Tentacool (Uncommon), Goldeen (Rare), Horsea (Uncommon), Remoraid (Rare), Seel (Rare), Koffing (Common), Ledyba (Common)", 
	"Newpine Town" : "Zigzagoon (Common), Lotad (Common), Corphish (Common), Krabby (Common), Wingull (Common)", 
	"Route 5" : "Nidoran-M (Common), Nidoran-F (Common), Taillow (Common), Tangela (Common), Trapinch (Commom), Psyduck (Uncommon), Snubbull  (Uncommon), Spoink (Common), Tropius (Rare)", 
	"Grayview Cave" : "Nincada (Uncommon), Spinarak (Common), Makuhita (Common), Tyrogue (Rare), Sneasel (Uncommon), Diglett (Common), Geodude (Common), Zubat (Common), Onix (Uncommon), Shuckle (Uncommon), Wynaut (Rare)",
	"Grayview Cave Secret Grotto" : "Larvitar (Grotto Rare), Delibird (Common), Spoink (Common), Sableye (Rare)",
	"Oldpine Town" : "Ledyba (Common), Growlithe (Common), Gastly (Common), Duskull (Rare), Shuppet (Rare)",
	"Oldpine Jailfield" : "Rattata (Common)",
	"Diglett Run Cave" : "Diglett (Common), Zubat (Common)",
	"South Grayview Cave" : "Spinarak (Common), Mawile (Rare), Aron (Rare), Whismur (Common), Nosepass (Rare), Spinda (Common), Teddiursa (Common), Zubat (Common), Wynaut (Rare), Rhyhorn (Rare)",
	"Route 6" : "Electrike (Common), Shroomish (Rare), Mareep (Common), Elekid (Rare), Ledyba (Common), Togepi (Common), Pichu (Rare), Igglybuff (Common), Skitty (Common), Wurmple  (Common)",
	"Eastbourne Shore" : "Krabby (Common), Wingull (Common)",
	"West Eastbourne Farmlands" : "Sentret (Common), Zigzagoon (Common), Sunkern (Common), Furret (Uncommon), Zangoose (Rare)",
	"Northwest Eastbourne Farmlands" : "Sentret (Common), Zigzagoon (Common), Sunkern (Common), Furret (Uncommon), Zangoose (Rare)",
	"East Eastbourne Farmlands" : "Sentret (Common), Zigzagoon (Common), Sunkern (Common), Furret (Uncommon), Zangoose (Rare)",
	"Grand Garden Maze" : "Sunkern (Common), Zangoose (Rare), Silcoon (Uncommon), Zigzagoon (Common)",
	"Route 7" : "Numel (Common), Furret (Uncommon), Gligar (Uncommon), Cacnea (Common), Seviper (Rare)",
	"Sunrock Desert A" : "Cacnea (Common), Houndour (Common), Numel (Common), Phanpy (Common), Slugma (Rare), Cascoon (Uncommon), Silcoon (Uncommon), Castform (Rare)",
	"Sunrock Desert B" : "Cacnea (Common), Houndour (Common), Numel (Common), Phanpy (Common), Slugma (Rare), Solrock (Rare)",
	"Sunrock Desert C" : "Cacnea (Common), Houndour (Common), Magby (Rare), Numel (Common), Phanpy (Common), Slugma (Rare)",
	"Sunrock Desert D" : "Cacnea (Sp Atk), Houndour (Sp Atk), Magby (Speed), Numel (Sp Atk), Phanpy (HP), Slugma (Sp Atk)",
	"Sunrock Desert E" : "Cacnea (Common), Houndour (Common), Numel (Common), Phanpy (Common), Lunatone (Rare), Baltoy (Rare), Electabuzz (Rare), Slugma (Rare)",
    "Route 8" : "Phanpy (Common), Cacnea (Common), Numel (Common), Houndour (Common), Slugma (Common)",
    "Route 8 Secret Grotto" : "Numel (Common), Houndour (Common), Slakoth (Uncommon), Bagon (Grotto Rare)",
    "Route 9" : "Cacnea (Common), Cascoon (Uncommon), Castform (Uncommon), Numel (Common), Silcoon (Uncommon)",
    "Route 10" : "Cascoon (Common), Silcoon (Uncommon), Magikarp (Common), Lotad (Common), Lombre (Common), Pineco (Common), Qwilfish (Common), Azurill (Common)",
    "Route 11" : "Magikarp (Common), Lotad (Common), Qwilfish (Common), Carvanha (Common), Pineco (Common), Azurill (Common), Lombre (Common), Slowpoke (Uncommon)",
    "Safari Zone 1" : "Stantler (Common), Mr. Mime (Common), Minun (Common), Dustox (Uncommon), Beautifly (Uncommon), Absol (Rare), Beautifly (Uncommon), Lotad (Common), Magikarp (Common), Wooper (Common)",
    "Safari Zone 2" : "Wynaut (Common), Minun (Common), Miltank (Uncommon), Lickitung (Uncommon), Wooper (Common), Magikarp (Common), Lotad (Common), Shellder (Common) Carvanha (Uncommon), Staryu (Rare), Beautifly (Rare), Dustox (Rare)",
    "Safari Zone 3" : "Minun (Common), Lotad (Common), Clefairy (Uncommon), Farfetch'd (Uncommon), Smeargle (Rare), Kangaskhan (Rare), Dustox (Rare), Beautifly (Rare)",
    "Frost Cave" : "Wynaut (Common), Wobbuffet (Uncommon), Snorunt (Common), Seel (Rare)",
    "Route 12" : "Slowpoke (Common), Wooper (Common), Pineco (Common), Stantler (Common), Carvanha (Uncommon), Lombre (Common), Lotad (Common), Magikarp (Common), Qwilfish (Common)",
    "Dorocoast Town Dock" : "Pidgey (Common), Wingull (Common)",
    "Shipwreck Sands" : "Wingull (Common), Tentacool (Common), Carvanha (Uncommon), Wailmer (Uncommon), Corsola (Uncommon), Mantine (Common)",
    "SeaFairy Forest": "Wingull (Common), Yanma (Common), Jigglypuff (Common), Shellos (Uncommon), Munchlax (Rare), Scyther (Rare), Magikarp (Common), Carvanha (Common), Poliwag (Rare)",
    "Seafloor Cave" : "Chinchou (Common), Corsola (Common), Magikarp (Common), Relicanth (Rare), Remoraid (Common), Staryu (Rare)",
    "Blackfell Island Forest" : "Meowth (Common), Sudowoodo (Common,Day Only), Misdreavus (Common, Night Only), Paras (Common, Night Only), Gastly (Common, Night Only), Spearow (Common, Day Only)",
    "Blackfell Island Graveyard" : "Cubone (Uncommon), Spearow (Common, Day Only), Meowth (Common), Sudowoodo (Common, Day Only), Misdreavus (Common, Night Only), Gastly (Common, Night Only)",
    "Blackfell Caverns" : "Zubat (Common), Gastly (Common), Cubone (Rare)",
    "Blackfell Caverns F2" : "Gastly (Common), Misdreavus (Common), Zubat (Common)",
    "Blackfell Caverns F3" : "Numel (Common), Slugma (Common), Torkoal (Rare)",
    "Blackfell Caverns F4" : "Numel (Uncommon), Slugma (Common)",
    "Blackfell Caverns Secret Grotto" : "Magikarp (Common), Smoochum (Uncommon), Lapras (Grotto Rare)",
    "Blackfell Caverns F1-A" : "Cubone (Uncommon), Duskull (Uncommon), Gastly (Common), Nincada (Common), Shuppet (Uncommon), Zubat (Common)",
    "Route 15" : "Mareep (Common), Oddish (Common), Flaaffy (Rare), Luvdisc (Rare, Day Only), Beedrill (Common, Day Only), Volbeat (Common, Night Only), Hoothoot (Common, Night Only), Chimecho (Rare, Night Only)",
    "Route 16" : "Mareep (Common), Flaaffy (Rare), Oddish (Common), Butterfree (Common, Day Only), Hoothoot (Common, Night Only), Illumise (Uncommon, Night Only), Chimecho (Rare, Night Only)",
    "Sand Temple" : "Unown (Common)",
    "Route 13" : "Barboach (Common), Exeggcute (Common), Tropius (Uncommon, Day Only), Slakoth (Common), Seedot (Common, Night Only), Smeargle (Uncommon), Nuzleaf (Uncommon, Night Only), Kecleon (Rare)",
    "Route 14" : "Barboach (Common), Swablu (Rare), Roselia (Ucommon, Day Only), Magikarp (Common), Aipom (Common), Exeggcute (Common), Feebas (Uncommon), Tropius (Uncommon, Day Only), Seedot (Common, Night Only), Nuzleaf (Uncommon, Night Only)",
    "Route 14 Secret Grotto" : "Eevee (Grotto Rare), Wooper (Common), Zigzagoon (Common)",
    "Route 17" : "Geodude (Common), Pinsir (Common), Stantler (Uncommon), Gligar (Common), Girafarig (Uncommon), Kangaskhan (Uncommon), Clefairy (Rare, Night Only), Magmar (Rare), Staravia (Uncommon, Day Only)",
    "Route 18" : "Spinda (Common), Tauros (Common), Skarmory (Uncommon), Dunsparce (Common), Jynx (Common, Night Only), Murkrow (Common, Night Only), Staravia (Uncommon, Day Only)",
    "Route 18 Secret Grotto" : "Geodude (Common), Mr. Mime (Common), Beldum (Grotto Rare)",
    "Route 19" : "Doduo (Common), Tauros (Common), Ponyta (Common), Delibird (Common), Meditite (Rare), Snorunt (Rare), Jynx (Common, Night Only), Snorlax (Common, Night Only)",
    "Undersea Cave" : "Magikarp (Common), Chinchou (Common), Remoraid (Common), Corsola (Uncommon), Spheal (Uncommon), Tentacool (Common), Clamperl (Rare)",
    "North Grayview Cave" : "Diglett (Common), Spinarak (Common), Zubat (Common), Geodude (Common), Sneasel (Uncommon), Tyrogue (Rare)",
    "Trail to Onderblade" : "Diglett (Common), Spinarak (Common), Zubat (Common), Geodude (Common), Sneasel (Uncommon), Tyrogue (Rare)",
    "Onderblade Mines" : "Geodude (Common), Onix (Rare)",
    "Willowsteen Forest" : "Pidove (Common), Silcoon (Uncommon, Day Only), Starly (Common, Day Only), Mawile (Uncommon), Vulpix (Common), Dustox (Uncommon, Night Only), Hoothoot (Common, Night Only), Cascoon (Uncommon, Night Only), Beautifly (Uncommon, Day Only)",
    "Bluegum Underground" : "Geodude (Common), Diglett (Common), Sandshrew (Uncommon), Nosepass (Rare)",
    "Bluegum Depths" : "Diglett (Common), Geodude (Common), Sandshrew (Uncommon), Nosepass (Rare)",        
    "Sorcerer's Castle Grounds" : "Pidove (Uncommon), Poochyena (Common), Kricketot (Common, Night Only), Hoothoot (Common, Night Only), Budew (Rare, Day Only), Nincada (Common, Day Only)",
    "Grayview City Outskirts" : "Delibird (Common), Jynx (Uncommon), Snorunt (Common), Tauros (Common)",
    "Agent Ruins" : "Porygon (Rare), Rattata (Common), Sandshrew (Common), Shuckle (Uncommon)",
    "Ashfall Forest" : "Bonsly (Uncommon), Fletchling (Common), Pansear (Rare), Starly (Common)",       
    "Route 200" : "Fletchling (Common), Pidove (Uncommon), Purrloin (Common) Starly (Common)",
    "Route 201" : "Bidoof (Common), Magikarp (Common), Purrloin (Common), Starly (Common), Wingull (Common)",
    "Honeybun Farm" : "Miltank (Rare), Bidoof (Common), Pidove (Uncommon), Purrloin (Common), Starly (Common), Bunnelby (Feed Important Carrot to NPC Bunnelby)",
    "Sandmarsh Rainforest" : "Bidoof (Common), Cherubi (Common), Scatterbug (Common), Sewaddle (Common), Venipede (Rare)",
    "Sandmarsh Pond" : "Bidoof (Common), Cherubi (Common), Scatterbug (Common), Sewaddle (Common), Pansage (Rare)",
    "Honeybun Meadow" : "Combee (Uncommon), Pidove (Uncommon), Purrloin (Common), Sewaddle (Common), Weedle (Common),// Bidoof, Buneary, Fletchinder, Weedle(Caught upon KO)",
    "Dorocoast Lava Chamber" : "Dwebble (Uncommon), Litleo (Rare), Slugma (Common)",
    "Sunrock Fields A1" : "Blitzle (Uncommon), Bouffalant (Uncommon), Petilil (Common), Sewaddle (Common), Skiddo (Uncommon), Starly (Common)",
    "Sunrock Fields A2" : "Blitzle (Uncommon), Bouffalant (Uncommon), Petilil (Common), Sewaddle (Common), Skiddo (Uncommon), Starly (Common)",
    "Sunrock Fields A3" : "Blitzle (Uncommon), Bouffalant (Uncommon), Flabebe (Common), Petilil (Common), Sewaddle (Common), Skiddo (Uncommon), Starly (Common)",
    "Sunrock Fields B1" : "Blitzle (Uncommon), Bouffalant (Uncommon), Flabebe (Common), Fletchling (Common), Furfrou (Rare), Petilil (Common), Starly (Common)",
    "Sunrock Fields B2" : "Blitzle (Uncommon), Bouffalant (Uncommon), Fletchling (Common), Furfrou (Rare), Petilil (Common), Starly (Common)",
    "Sunrock Fields B3" : "Blitzle (Uncommon), Bouffalant (Uncommon), Fletchling (Common), Furfrou (Rare), Petilil (Common), Starly (Common)",
    "Sunrock Fields C2" : "Blitzle (Uncommon), Bouffalant (Uncommon), Fletchling (Common), Petilil (Common), Pidove (Uncommon), Rufflet (Rare)",
    "Sunrock Fields C3" : "Blitzle (Uncommon), Bouffalant (Uncommon), Fletchling (Common), Petilil (Common), Pidove (Uncommon), Rufflet (Rare), Flabebe (Common)",
    "Sunrock Fields E2" : "Rufflet (Rare), Pidove (Common), Flabebe (Common), Petilil (Common), Fletchling (Common)",
    "Twin River Island" : "Pinsir (Common), Heracross (Common), Spearow (Common), Surskit (Common), Zigzagoon (Common)",
    "Sandmarsh Swamp" : "Lotad (Common)",
    "East Twin River Peaks" : "Taillow (Common), Spearow (Common), Hoppip (Uncommon),",
    "West Twin River Peaks" : "Taillow (Common), Spearow (Common), Hoppip (Uncommon),",
    "Deserted Island" : "Weedle (Common), Deerling (Common), Joltik (Uncommon), Larvesta (Rare) ",
	"Deserted Shore" : "Weedle (Common), Deerling (Common), Joltik (Uncommon), Larvesta (Rare) "
   }

String.prototype.capitalize = function () {
  return this.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
};

function location_pokemon(mapCode) {
  if (location_data[mapCode] != null) {
    $("#Mapdata_grid").css("display", "block");
    $("#Found_data").html(
      mapCode + ": <i>" + location_data[mapCode].capitalize() + "</i>."
    );
  }
}

// load the x & apply to the page
var location_html =
  '<div class="mws-panel grid_8" id="Mapdata_grid"> <div class="mws-panel-header"> <span class="mws-i-24 i-chart-2">[Extension] Pokemons in Map</span> </div>	<div class="mws-panel-body" >	<div class="mws-panel-content"> <select id="map_select" name="map_select"></select> <div id="Found_data"></div> </div> </div> </div>';

$("#mws-container").prepend(location_html);
var map_select = document.getElementById("map_select");

for (var i = 0; i < mapCode_data.length; i++) {
  var option = document.createElement("option");
  option.text = mapCode_data[i];
  map_select.add(option);
}
location_pokemon(map_select.value);

map_select.addEventListener("change", function () {
  var selectedOption = this.options[map_select.selectedIndex];
  location_pokemon(selectedOption.value);
});

// Note for skids
console.log("Not the whole src and css ignored");
