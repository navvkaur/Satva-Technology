const Customers = require('../Models/Customers')
const CustomersMaster = require('../Models/CountryMaster')

async function addtomaster(country){
    await CustomersMaster.findOne({where:{CountryName:country}}).then(async (res)=>{
            if(!res){
              await CustomersMaster.create({CountryName:country}).then((data)=>{
                return data.id;
              })
            }
            else{
                return res.id;
            }
            
    }).catch(err=>{console.log(err)})

}
exports.DetailsApi = async (req,res,next)=> {
    console.log(req.body)
    try{
        let detail = req.body;
        let error = []
        if(detail.fname == null || detail.mname == null ||detail.lname == null  )
        {
            error.push({"Message": " Name Required",
            "Detail": "The Name Required."})
        }
        if(detail.country == null)
        {
             error.push({"Message": " Country Name Required",
             "Detail": "The  Country Name Required."})
        }
        if(detail.company == null){
             error.push({"Message": " Company Name Required",
            "Detail": "The  Company Name Required."})
        }
        if(detail.Email == null){
             error.push({"Message": " Email Required",
            "Detail": "The  Email Required."})
        }

    const email = await Customers.findOne({where:{Email:detail.Email}})
    if(email)
    {
        error.push({
        "Message": "Duplicate Email Exists",
        "Detail": "The Email supplied already exists.",})
    }
    if(error.length)
    {
       return res.status(400).json(error);
    }
    if(error.length == 0)
    {  
        await addtomaster(detail.country)
        CustomersMaster.findOne({where:{CountryName:detail.country}}).then(async (d)=>{
            await Customers.create(detail).then((data)=>{
                Customers.update({countryMasterId : d.id },{where:{id:data.id}})
            })
            return res.status(200).json({success:true,Message:'Customer Created!'})
         });

       
    }
    }
    catch(err){
        console.log(err)
        return res.status(404).json({Success:false,Message:'Something Went wrong!' , error:err})
    }

}