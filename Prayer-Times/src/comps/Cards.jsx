import * as React from "react";
import "../App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import classNames from "classnames";

export default function MediaCard({ name, time, img, nextPray }) {
  return (
    <>
      <Card
        sx={{ width: 280 }}
        className={classNames("cardhover", {
          nextPrayer: name === nextPray,
        })}
      >
        <CardMedia
          component="div"
          sx={{
            height: 200,
            backgroundImage: `url(${img})`,
            backgroundPosition: "bottom",
            backgroundRepeat: "no-repeat",
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            variant="h3"
            component="div"
            sx={{ fontWeight: "bold" }}
          >
            {name}
          </Typography>
          <Typography variant="h4" sx={{ color: "text.primary" }}>
            {time}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
