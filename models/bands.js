const Band = require("./band");

class Bands{

constructor(){
    this.Bands=[];
}

addBand( band = new Band()){
    this.Bands.push(band);
}

getBands(){
    return this.Bands;
}

deleteBand(id=''){
    this.Bands = this.Bands.filter(band => band.id !== id);
    return this.Bands;
}

voteBand(id=''){

    this.Bands = this.Bands.map(band =>{
        if(band.id === id){
            band.votes ++;
            return band;
        }else{
            return band;
        }
    });


}


}

module.exports = Bands;