import React from "react"; 
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import ImageList from "@material-ui/core/ImageList";
import ImageListItem from "@material-ui/core/ImageListItem";
import { useQuery } from "react-query";
import Spinner from '../spinner'
import { getActorImages } from "../../api/movie-api";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  gridList: {
    width: 450,
    height: '100vh',
  },
}));

const TemplateActorPage = ({ actor, children }) => {
  const classes = useStyles();
  const { data , error, isLoading, isError } = useQuery(
    ["images", { id: actor.id }],
    getActorImages
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const images = data.profiles

  return (
    <>
      <Grid container spacing={5} style={{ padding: "15px" }}>
        <Grid item xs={3}>
          <div className={classes.root}>
            <ImageList rowHeight={235} className={classes.gridList} cols={1}>
              {images.map((image) => (
                <ImageListItem key={image.file_path} className={classes.gridListTile} cols={1}>
                  <img
                    src={`https://image.tmdb.org/t/p/w235_and_h235_face/${image.file_path}`}
                    alt={image.poster_path}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </div>
        </Grid>

        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateActorPage;