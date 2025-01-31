import React, { useEffect,useState } from 'react'
import {
  Paper,
  Grid,
  Box,
  makeStyles,
  TextField ,
  
} from "@material-ui/core";

const useStyles = makeStyles({
  gridContainer:{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      padding: 35,
    },
    paper: {
     padding: 35,
    textAlign: "left",
    color: "white",
    background: "#1C1C1C",
    border: "1px solid rgba(0, 0, 0, 0.2)",
    display: "grid",
    justifyItems: "flex-start",
    alignItems: "center",
    paddingLeft: 35,
    paddingRight: 35,
    overflow: "hidden",
    "&:hover": {
      background: "#1a1a1a",
    },
  
    },
    innerGrid:{
      margin:12,
      backgroundColor:"#1C1C1C"
    },
    jobhunt:{
      background:"#222222",
    },
    link:{
      textDecoration:"none"
    }
    
})



function Jobhunt() {
  const classes = useStyles();
  const [data,setData]=useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setNewSearch] = useState("");

    useEffect(() => {
       fetch('portal.json',{
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         }
      }
      )
        .then(res => res.json())
        .then(data => {
            setData(data)
            setFilter(data)
            console.log(data)
        })
    },[])


    const handleChange = (e) => {
      console.log(e.target.value)
      setNewSearch(e.target.value)
      const filtered = filter.filter((item) => item.Title.toLowerCase().includes(search.toLowerCase()))
      setFilter(filtered)
    }


  return (
    <div className={classes.jobhunt}>
     <div className='form'>
        <TextField id="outlined-search" onChange={handleChange} label="Search field" type="search" />
     </div>


      <Box py={6} px={3}>
        <Grid container className={classes.gridContainer} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {
          filter && filter.length > 0 && filter.map((item) => 
          <Grid className={classes.innerGrid} item xs={6} sm={3}>
            <a href={item.Link} className={classes.link}><Paper className={classes.paper}>{item.Title}</Paper></a>
          </Grid>
          
          )
        }
          
        </Grid>
      </Box>
    </div>
  )
}

export default Jobhunt