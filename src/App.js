import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function App() {
  const [planvalue, setPlanValue] = useState('');
  const [inedit, setInEdit] = useState('');
  const [planbtn, setPlanBtn] = useState('Add Plan');


  const [plandata, setPlanData] = useState([]);

  const addPlan = (e) => {
    e.preventDefault()
    console.log(planvalue)

    if(inedit === ''){

    setPlanData([...plandata, { id: uuidv4(), title: planvalue }])
    setPlanValue("")
  }else{
      
    let title = planvalue
    let id = inedit
    let newplan = plandata.map((index)=>
        index.id === inedit ? { id, title}: index
    )

    setPlanData(newplan)
    setInEdit('')
    setPlanValue("")

    setPlanBtn('Add Plan')
  }

  }
  
  const editPlan = (id) =>{

    let edit = plandata.find(item => item.id === id)
    setPlanValue(edit.title)
    setInEdit(edit.id)
    setPlanBtn('Update Plan')

    console.log(id);
  }

  const deletePlan = (id) => {
    
    setPlanData(plandata.filter((data) => data.id !== id ))
  }


  return (
    <div className="container">
      <div className='card mt-5'>
        <div className='card-body'>
          <form onSubmit={addPlan}>
            <TextField
              id="outlined-error"
              label="Todays Plan"
              fullWidth
              value={planvalue}
              onChange={(e) => { setPlanValue(e.target.value) }}
            />
            
            <Button variant="contained" type='submit' className='mt-2' >{planbtn}</Button>
          </form>
        </div>

      </div>


      {plandata !== [] ?
        <div className='card mt-3'>

          <div className='card-body'>
            {plandata.map((index,k ) =>
              <Grid container spacing={2} key={k} className='mt-2'>
                <Grid item xs={8}>
                  <Item>{index.title}</Item>
                </Grid>
                <Grid item xs={4}>
                  <Item>
                    <Button variant="contained" onClick={() => editPlan(index.id)} >Edit</Button>
                    <Button variant="contained" color='error' className='mx-1' onClick={() => deletePlan(index.id)} >Delete</Button>
                  </Item>
                </Grid>

              </Grid>
            )}

          </div>
        </div> : null
      }
    </div>
  );
}

export default App;
