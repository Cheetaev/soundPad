import * as React from "react"
import { Link } from "gatsby"
import Button from "@mui/material/Button"
import "./pad.css"
import { Grid, MenuItem } from "@mui/material"
import { Howl, Howler } from 'howler';
import { useStaticQuery, graphql } from "gatsby"




const PadItem = ({ text, boop }) => {

  const sound = new Howl({
    src: [boop]
  });

  const handleClick = () => {
    Howler.stop()
    sound.play()
  }

  return (
    <Grid sx={{m: 1, display: "flex" }}>
      <Grid sx={{ width:150, height:200, marginBottom: 10}} container direction={"column"} alignItems={"center"} rowGap={3}>
          <Button className="learn-more" onClick={() => handleClick()} />
          <Grid sx={{width:150, height:50, textAlign:"center", overflow:"hidden", textOverflow:"ellipsis", maxWidth:150}}>
            <Link className="soundName" to="/" sx={{}}>{text}</Link>
          </Grid>
          
      </Grid>
    </Grid>
  )
}

const Pad = () => {
  const response = useStaticQuery(graphql`
    query {
      allFile(filter: {internal: {mediaType: {}}, extension: {eq: "mp3"}}) {
        edges {
          node {
            name
            publicURL
          }
        }
      }
    }
  `)
  const data = response.allFile?.edges.map(x=>x.node)

  return (
    <Grid container spacing={0} sx={{ display: "flex", justifyContent: "center" }} alignItems={"center"}>
      {data.map((pad, index) => {
        return <PadItem text={pad.name} boop={pad.publicURL} key={index} />
      })}
    </Grid>
  )
}

export default Pad
