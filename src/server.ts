import express from 'express';
import { uuid } from 'uuidv4';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());


interface ISolicitation{
  id: string;
  name?: string;
}


const solicitation: ISolicitation[] = [];

app.get('/', (request, response)=>{
  response.json({message: solicitation});
}); 

app.get('/:id', (request, response)=>{
  let { id } = request.params;

  const findSolicitationById = solicitation.findIndex(item => item.id == id);
  response.json({message: solicitation[findSolicitationById]});
}); 



app.post('/',  (request, response)=>{
  const {name } = request.body;

  const solicitationReq = {
    id : uuid(),
    name
  }

  console.log(solicitationReq)


  solicitation.push(solicitationReq)

  response.json(solicitationReq);
});

app.put('/edit/:id', (request, response)=>{
  let { id } = request.params;
  let newName = request.body.name;
   const findSolicitationById = solicitation.findIndex(item => item.id == id);

   if(findSolicitationById != -1) {
    solicitation[findSolicitationById].name = newName
    return response.json({message: 'Change made successfully'});
   } else {
    return response.json({erro: 'ID not dound'});
     
   }
})

app.delete('/delete/:id', (request, response)=>{
  let { id } = request.params;

   const findSolicitationById = solicitation.findIndex(item => item.id == id);

   if(findSolicitationById != -1) {
    solicitation.splice(findSolicitationById, 1);
    return response.json({message: 'user successfully deleted'});
   } else {
    return response.json({erro: 'ID not dound'});
     
   }
})



app.listen('3333', ()=>{
  console.log('Servidor Ok!')
});