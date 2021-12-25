import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import { CardContent , Grid} from "@material-ui/core";
import StarRateIcon from "@material-ui/icons/StarRate";
import { CardActions } from "@material-ui/core";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";



const useStyles = makeStyles({
  card: { maxWidth: 345 },
  media: { height: 500 },
  avatar: {
    backgroundColor: "rgb(255, 0, 0)",
  },
});

export default function ActorCard({ actor , action}) {
  const classes = useStyles();



  return (
    <Card className={classes.card}>
      <CardHeader
        className={classes.header}
        title={
          <Typography variant="h5" component="p">
            {actor.name}{" "}
          </Typography>
        }
      />      <CardMedia
        className={classes.media}
        image={`https://image.tmdb.org/t/p/w235_and_h235_face/${actor.profile_path}`
        }
      />
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {"  "} {actor.popularity}{" "}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <Link to={`/actors/${actor.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}