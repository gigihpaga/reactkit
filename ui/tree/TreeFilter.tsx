import { useState, Fragment } from 'react'
import styled, { useTheme } from 'styled-components'
import { TreeNode } from '@reactkit/utils/tree'
import { transition } from '../css/transition'
import { verticalPadding } from '../css/verticalPadding'
import { InputProps } from '../props'
import { handleWithStopPropagation } from '../shared/events'
import { Circle } from '../ui/Circle'
import { NonEmptyOnly } from '../base/NonEmptyOnly'
import { VStack, HStack } from '../layout/Stack'
import { Text } from '../text'

interface TreeFilterProps<T> extends InputProps<number[]> {
  tree: TreeNode<T>
  renderName: (value: T) => string
}

const Content = styled(VStack)`
  margin-left: 20px;
`

const Container = styled(VStack)`
  cursor: pointer;
`

const Item = styled(HStack)`
  ${verticalPadding(4)}
  align-items: center;
  gap: 8px;
  ${transition}
`

export function TreeFilter<T>({
  tree,
  renderName,
  value,
  onChange,
}: TreeFilterProps<T>) {
  const [hovered, setHovered] = useState<number[] | undefined>()

  const { colors } = useTheme()

  const recursiveRender = (node: TreeNode<T>, path: number[]) => {
    const isSelected = value.every((v, i) => v === path[i])

    let color = isSelected ? colors.text : colors.textShy
    if (hovered) {
      const isHovered = hovered.every((v, i) => v === path[i])
      color = isHovered ? colors.text : colors.textShy
    }

    return (
      <Container
        onClick={handleWithStopPropagation(() => onChange(path))}
        onMouseEnter={() => setHovered(path)}
        onMouseLeave={() => {
          setHovered(
            path.length === 0 ? undefined : path.slice(0, path.length - 1),
          )
        }}
      >
        <Item
          style={{
            color: color.toCssValue(),
          }}
        >
          <Circle
            size={8}
            background={isSelected ? colors.primary : colors.transparent}
          />
          <Text weight="bold">{renderName(node.value)}</Text>
        </Item>
        <NonEmptyOnly
          array={node.children}
          render={(items) => (
            <Content>
              {items.map((child, index) => (
                <Fragment key={index}>
                  {recursiveRender(child, [...path, index])}
                </Fragment>
              ))}
            </Content>
          )}
        />
      </Container>
    )
  }

  return <>{recursiveRender(tree, [])}</>
}
