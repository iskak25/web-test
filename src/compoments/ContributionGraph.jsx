import style from './ContributionGraph.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { GetState } from '../redux/stateSlice'
import { useEffect, useState } from 'react'

const ContributionGraph = () => {
  const data = useSelector((state) => state.state?.data)
  const dispatch = useDispatch()
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }
  const skeleton = [...new Array(26)].map(() => (
    <li className={style.squares_empty}></li>
  ))
  const skeletons = [...new Array(111)].map(() => (
    <li className={style.squares_empty}></li>
  ))

  function sum(m, n) {
    if (n == 0) {
      console.log(n)
      return <li className={style.squares_one} key={m} data-level={n}></li>
    } else if (n < 9) {
      console.log(n)
      return (
        <li
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={style.squares_two}
          key={m}
          data-level={n}
        ></li>
      )
    } else if (n < 19) {
      console.log(n)
      return <li className={style.squares_three} key={m} data-level={n}></li>
    } else if (n < 29) {
      console.log(n)
      return <li className={style.squares_four} key={m} data-level={n}></li>
    } else if (n > 30) {
      console.log(n)
      return <li className={style.squares_five} key={m} data-level={n}></li>
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
          {objectArray?.map((item) => (
            <>{sum(item.key, item.value)}</>
          ))}
          {skeletons}
        </ul>
      </div>
      {isHovered ? (
        <div className={style.deck}>
          <p className={style.contributions}>25 contributions </p>
          <p className={style.dataId}>Четверг, Ноябрь 28, 2022</p>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default ContributionGraph
