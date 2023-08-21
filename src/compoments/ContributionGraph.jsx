import style from './ContributionGraph.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { GetState } from '../redux/stateSlice'
import { useEffect, useState } from 'react'

const ContributionGraph = () => {
  const data = useSelector((state) => state.state?.data)
  const dispatch = useDispatch()
  const [hoveredBlock, setHoveredBlock] = useState(null)

  function editDate(cout) {
    return new Date(cout)
  }

  const handleMouseEnter = (blockId) => {
    setHoveredBlock(blockId)
  }

  const handleMouseLeave = () => {
    setHoveredBlock(null)
  }
  const skeleton = [...new Array(26)].map(() => (
    <li className={style.squares_empty}></li>
  ))
  const skeletons = [...new Array(111)].map(() => (
    <li className={style.squares_empty}></li>
  ))

  function sum(m, n, value) {
    if (n < 9) {
      return (
        <>
          <li
            onMouseEnter={() => handleMouseEnter(m)}
            onMouseLeave={handleMouseLeave}
            className={style.squares_one}
            key={m}
            data-level={n}
          ></li>
          {hoveredBlock == m ? (
            <div className={style.container}>
              <div className={style.deck}>
                <p className={style.contributions}>{n} contributions </p>
                <p className={style.dataId}>{value}</p>
              </div>
            </div>
          ) : (
            ''
          )}
        </>
      )
    } else if (n < 19) {
      return (
        <>
          <li
            onMouseEnter={() => handleMouseEnter(m)}
            onMouseLeave={handleMouseLeave}
            className={style.squares_two}
            key={m}
            data-level={n}
          ></li>
          {hoveredBlock == m ? (
            <div className={style.container}>
              <div className={style.deck}>
                <p className={style.contributions}>{n} contributions </p>
                <p className={style.dataId}>{value}</p>
              </div>
            </div>
          ) : (
            ''
          )}
        </>
      )
    } else if (n < 29) {
      return (
        <>
          <li
            onMouseEnter={() => handleMouseEnter(m)}
            onMouseLeave={handleMouseLeave}
            className={style.squares_three}
            key={m}
            data-level={n}
          ></li>
          {hoveredBlock == m ? (
            <div className={style.container}>
              <div className={style.deck}>
                <p className={style.contributions}>{n} contributions </p>
                <p className={style.dataId}>{value}</p>
              </div>
            </div>
          ) : (
            ''
          )}
        </>
      )
    } else if (n > 30) {
      return (
        <>
          <li
            onMouseEnter={() => handleMouseEnter(m)}
            onMouseLeave={handleMouseLeave}
            className={style.squares_four}
            key={m}
            data-level={n}
          ></li>
          {hoveredBlock == m ? (
            <div className={style.container}>
              <div className={style.deck}>
                <p className={style.contributions}>{n} contributions </p>
                <p className={style.dataId}>{new Date(value)}</p>
              </div>
            </div>
          ) : (
            ''
          )}
        </>
      )
    }
  }

  useEffect(() => {
    dispatch(GetState())
  }, [])

  const objectArray = Object.keys(data).map((key) => ({
    key: key,
    value: data[key],
  }))

  return (
    <>
      <div class={style.graph}>
        <ul class={style.months}>
          <li>Май.</li>
          <li>Июнь.</li>
          <li>Июнь.</li>
          <li>Авг.</li>
          <li>Сент.</li>
          <li>Окт.</li>
          <li>Нояб.</li>
          <li>Дек.</li>
          <li>Янв.</li>
          <li>Февр.</li>
          <li>Март.</li>
          <li>Апр.</li>
        </ul>
        <ul class={style.days}>
          <li>Пн</li>
          <li>Вт</li>
          <li>Ср</li>
          <li>Чт</li>
          <li>Пт</li>
          <li>Сб</li>
          <li>Вс</li>
        </ul>
        <ul className={style.squares}>
          {skeleton}
          {objectArray?.map((item, index) => (
            <>{sum(index, item.value, item.key)}</>
          ))}
          {skeletons}
        </ul>
      </div>
      {/* {isHovered ? (
        <div className={style.deck}>
          <p className={style.contributions}>25 contributions </p>
          <p className={style.dataId}>Четверг, Ноябрь 28, 2022</p>
        </div>
      ) : (
        ''
      )} */}
      <ul className={style.what}>
        Использованные стек технологии
        <li className={style.what}>React</li>
        <li className={style.what}>Redux</li>
        <li className={style.what}>Module SCSS</li>
        <li className={style.what}>для запроса axios</li>
        <li className={style.what}>буду рать любому отзыву</li>
        <a href="https://t.me/iskak2512">Телеграм</a>
      </ul>
    </>
  )
}

export default ContributionGraph
