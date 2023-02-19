class Predmet
{
    kodPredmeta;
    constructor() {}
    provjeriKodPredmeta(kod)
    {
        var niz = kod.split('-');
        if(niz[0]!='RI' && niz[0]!='AE' && niz[0]!='EE' && niz[0]!='TK')
        {
            return false;
        }
        if(niz[1]!='BoE' && niz[1]!='MoE' && niz[1]!='RS')
        {
            return false;
        }
        if(niz[2]!='1' && niz[2]!='2' && niz[2]!='3')
        {
            return false;
        }
        if(niz[3]!='1' && niz[3]!='2')
        {
            return false;
        }
        if(niz[1]=='RS' || niz[1]=='MoE')
        {
            if(niz[2]!='1' && niz[2]!='2')
            {
                return false;
            }
        }
        this.kodPredmeta=kod;
        return true;
    }
}

module.exports = Predmet;

//let predmet = new Predmet()
//kod1="RI-BoE-1-1";
//console.log(predmet.provjeriKodPredmeta(kod1)); // treba vratiti true;
//console.log(predmet.kodPredmeta); // treba vratiti "RI-BoE-1-1"

//kod2="TK-MoE-3-1";
//console.log(predmet.provjeriKodPredmeta(kod2)); // treba vratiti true;

//kod3="AE-BoE-1";
//console.log(predmet.provjeriKodPredmeta(kod3)); // treba vratiti true;

//kod4="RS-boe-1-2";
//console.log(predmet.provjeriKodPredmeta(kod4)); // treba vratiti true;