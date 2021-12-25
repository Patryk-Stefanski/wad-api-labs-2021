import React, { useState } from "react";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import StarRate from "@material-ui/icons/StarRate";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CakeIcon from "@material-ui/icons/Cake";


const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: theme.spacing(1.5),
    margin: 0,
  },
  chip: {
    margin: theme.spacing(0.5),
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const ActorDetails = ({ actor  }) => {  // Don't miss this!
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);
  var actorGender =""


  if(actor.gender === 2){
    actorGender="Male"
  }
  else actorGender="Female"

  return (
    <>
      <Typography variant="h5" component="h3">
        Biography
      </Typography>

      <Typography variant="h6" component="p">
        {actor.biography}
      </Typography>

      <Paper component="ul" className={classes.root}>
        <li>
          <Chip label="Known As" className={classes.chip} color="primary" />
        </li>
        {actor.also_known_as.map((g) => (
          <li key={g}>
            <Chip label={g} className={classes.chip} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" className={classes.root}>
        <Chip icon={<CakeIcon />} label={actor.birthday} />
        <Chip
          icon={<StarRate />}
          label={`${actor.popularity}`}
        />
        <Chip label={`Gender: ${actorGender}`} />
      </Paper>

      <Paper component="ul" className={classes.root}>
        <li>
          <Chip label="Place of Birth" className={classes.chip} color="primary" />
        </li>
            <Chip label={actor.place_of_birth} className={classes.chip} />
      </Paper>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
      </Drawer>
      </>
  );
};
export default  ActorDetails ;