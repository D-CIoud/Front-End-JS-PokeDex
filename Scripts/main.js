$("#BtnBuscar").click(function() {
    GetPokemon();
});

function GetPokemon(){
    var NombrePkm = $("#Nombre").val();
    var Tipo = $("#Tipo").val();
    var NoDex = $("NoDex").val();  

    $.ajax({
        type: "GET",
        url: "https://pokeapi.co/api/v2/pokemon/" + NombrePkm.toLowerCase() + "/",
        contentType: "application/json",
        dataType: 'json',
        success: function(data){
            console.log(data);
            $("#PkmName").val(data.forms[0].name.toUpperCase()); //Obtener nombre
            $("#PkmWeight").val((data.weight/2.205).toFixed(2)); //Obtener peso, hacemos conversión de libras a KG
            $("#PkmDexNo").val(data.id);
            if(data.types.length > 1)//Este if va a manejar si el poke tiene más de un tipo (puede ser un solo tipo o dos máximo)
                $("#PkmType").val(data.types[0].type.name.toUpperCase() + " / " + data.types[1].type.name.toUpperCase());
            else
                $("#PkmType").val(data.types[0].type.name.toUpperCase());
           
            var Stats = data.stats;
            var AllStats = "";
            var AllMoves = "";
            
            //Obtener las Stats del poké
            Stats.forEach(element => {
                AllStats +=  element.stat.name + ': ' + element.base_stat + ' | '
            });

            Stats = data.moves;

            //Obtener la lista de movimientos del poké
            Stats.forEach(moves => {
                AllMoves += moves.move.name + ", "
            });

            $("#PkmSprite").attr("src",data.sprites.front_default);

            $("#PkmStats").val(AllStats.toUpperCase());
            $("#PkmMove").val(AllMoves.toUpperCase());

        },
        error: function (request, error) {
            // console.log(arguments);
            $("#PkmName").val("Nombre del pokémon"); //Obtener nombre
            $("#PkmWeight").val("Peso"); //Obtener peso, hacemos conversión de libras a KG
            $("#PkmDexNo").val("No. Pokédex");
            $("#PkmType").val("Tipo");
            $("#PkmSprite").attr("src","Images/Who's That Pokémon.png");
            $("#PkmStats").val("Estadísticas");
            $("#PkmMove").val("Listado de Movimientos");
            alert("Lo sentimos, ha ocurrido un error al realizar la busqueda, por favor valida el nombre del poké o no. de dex que escribiste e intenta nuevamente ");
        }
    });
}


  var audio = document.getElementById("player");
  audio.volume = 0.2;