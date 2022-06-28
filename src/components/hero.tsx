import { Theme } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { CSSProperties, FunctionComponent, useEffect, useRef, useState, PropsWithChildren } from 'react'
import { Asset } from '../services/contentful'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      padding: `${theme.spacing(4)} 0`
    },

    video: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      objectPosition: 'middle center'
    },

    background: {
      position: 'absolute',
      top: 0, bottom: 0, right: 0, left: 0,
      backgroundSize: 'cover',
      zIndex: -100
    },

    shade: {
      position: 'absolute',
      top: 0, bottom: 0, right: 0, left: 0,
      zIndex: -90
    }
  }))

export type HeroMedia = {
  name: string
  media: Asset[]
}

export type HeroProps = {
  media: HeroMedia
  height: number
  shade?: number
  shadeColor?: 'black' | 'white',
  justify?: 'flex-start' | 'center' | 'flex-end' 
  imagePosition?: string
}

export const Hero: FunctionComponent<PropsWithChildren<HeroProps>> =
  ({ media, height, shade, justify, shadeColor, children, imagePosition }) => {
    const classes = useStyles()
    const [ heightInPx, setHeightInPx ]  = useState((window.innerHeight - 60) * height)
    const ref = useRef<HTMLDivElement>(null)

    const updateHeight = () => {
      const top = ref.current?.offsetTop || 60
      setHeightInPx((window.innerHeight - top) * height)
    }

    useEffect(() => {
      updateHeight()
      window.addEventListener('resize', updateHeight)
      return () => window.removeEventListener('resize', updateHeight)
      // eslint-disable-next-line
    }, [ height ])

    function background() {
      const file = media.media[0].fields.file
      if (file.contentType.startsWith("video")) {
        return (
          <video autoPlay muted loop className={classes.video}>
            <source src={file.url} type={file.contentType} />
          </video>
        )
      } else {
        const style: CSSProperties = {
          backgroundImage: `url(${file.url + "?w=" + window.screen.width})`,
          backgroundPosition: imagePosition || 'center',
        }
        return (
          <div className={classes.background} style={style} />
        )
      }
    }

    function renderShade() {
      if (!shade) {
        return null
      } else {
        const style: CSSProperties = { backgroundColor: shadeColor || 'black', opacity: shade }
        return (<div className={classes.shade} style={style}/>)
      }
    }

    const style: CSSProperties = {
      minHeight: heightInPx + 'px',
      justifyContent: justify || 'center'
    }

    return (
      <div ref={ref} className={classes.root} style={style}>
        {background()}
        {renderShade()}
        {children}
      </div>
    )
  }
