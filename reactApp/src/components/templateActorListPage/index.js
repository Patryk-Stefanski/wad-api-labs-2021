import React from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ActorList from "../actorList/index.js";

export var update = false;
export var searchQuery;

const useStyles = makeStyles({
  root: {
    padding: "20px",
  },
});

function ActorListPageTemplate({ actors  , action}) {
  const classes = useStyles();

  let displayedActors = actors

  return (
    <Grid container className={classes.root}>
      <Grid item container spacing={5}>
        <ActorList action={action} actors={displayedActors}></ActorList>
      </Grid>
    </Grid>
  );
}

export default ActorListPageTemplate;
