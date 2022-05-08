import React, { memo } from 'react'
// import RefreshIcon from '../../../assets/img/refresh.svg'
import { Card, Typography, Button, Select, MenuItem } from '../../../components'
import COUNTRIES from '../../../commons/constants/countries'
import { CardPanelContentStyled, ItemStyled } from './style'

const navigatorHasShare = navigator.share

function Panel({ updateAt, onChange, data, country }) {
  const { cases, todayDeaths, recovered, deaths, todayCases } = data

  const renderCountries = (country, index) => (
    <MenuItem key={`country-${index}`} value={country.value}>
      <ItemStyled>
        <div>{country.label}</div>
        <img src={country.flag} alt={`País-${country.label}`}/>
      </ItemStyled>
    </MenuItem>
  )

  const textCovid19 = `País: ${country} -
                      Total de casos: ${cases} -
                      Casos hoje: ${todayCases} -
                      Mortes hoje: ${todayDeaths} -
                      Total de mortes: ${deaths} -
                      Recuperados: ${recovered}`

  const copyInfo = () => (
    navigator.clipboard.writeText(textCovid19)
  )

  const shareInfo = () => {
    navigator.share({
      title: `Dados do Covid-19 - ${country}`,
      text: textCovid19,
      url: 'https://covid19dio.netlify.app/'
    })
  }

  const renderShareButton = (
    <div>
      <Button variant="contained" color="primary" onClick={shareInfo}>
        Compartilhar
      </Button>
    </div>
  )

  const renderCopyButton = (
    <div>
      <Button variant="contained" color="primary" onClick={copyInfo}>
        Copiar
      </Button>
    </div>
  )

  return (
    <Card>
      <CardPanelContentStyled>
        <div>
          <div>
            <Typography variant="h5" component="span" color="primary">COVID19</Typography>
          </div>
          <div>
            <Typography variant="h6" component="span" color="#000">Painel Coronavírus</Typography>
          </div>
          <div>
            <Typography variant="body2" component="span" color="secondary">Atualizado em: {updateAt}</Typography>
          </div>
          <div className="pt-2">
            <Select onChange={onChange} value={country}>
              {COUNTRIES.map(renderCountries)}
            </Select>
          </div>
        </div>
        {navigatorHasShare ? renderShareButton : renderCopyButton}
      </CardPanelContentStyled>
    </Card>
  )
}

export default memo(Panel)
