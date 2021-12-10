import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import { Text } from '@apeswapfinance/uikit'

interface FileProps {
  imageFile: File
  displayUrl: string
}

interface ImageUploadProps {
  title: string
  onChange: (file: FileProps) => void
}

const ImageUpload: React.FC<ImageUploadProps> = ({ title, onChange }) => {
  const fileDrop = useRef(null)
  const [file, setFile] = useState<FileProps>(null)

  const onSetFile = (e) => {
    const imageFile = e.target.files[0]
    if (imageFile) {
      const displayUrl = URL.createObjectURL(imageFile)
      setFile({ imageFile, displayUrl })
      onChange({ imageFile, displayUrl })
    }
  }

  return (
    <Container>
      <StyledText> {title} </StyledText>
      <ImageCircle image={file?.displayUrl} />
      <DragImageWrapper>
        <HiddenInput type="file" ref={fileDrop} onChange={onSetFile} />
        <DragAndDropText>{file?.imageFile?.name || 'Click here or Drop your PNG/SVG file here!'}</DragAndDropText>
      </DragImageWrapper>
    </Container>
  )
}

const Container = styled.div`
  height: 120px;
  width: 280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  ${({ theme }) => theme.mediaQueries.md} {
    height: 80px;
    width: 660px;
    margin-bottom: 25px;
    margin-top: 25px;
  }
`

const HiddenInput = styled.input`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 2;
  opacity: 0;
  cursor: pointer;
`

const DragImageWrapper = styled.div`
  position: relative;
  width: 180px;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) => (props.theme.isDark ? '#222222' : 'white')};
  border: 2px dashed #ffb300;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
  text-align: center;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 440px;
    height: 74px;
  }
`

const DragAndDropText = styled(Text)`
  font-family: Poppins;
  font-weight: 700;
  color: rgba(255, 179, 0, 1);
  cursor: pointer;
  font-size: 12px;
  ${({ theme }) => theme.mediaQueries.md} {
    font-size: 16px;
  }
`

const ImageCircle = styled.div<{ image?: string }>`
  width: 74px;
  height: 74px;
  background: ${(props) => (props.theme.isDark ? '#222222' : 'white')};
  border-radius: 50px;
  margin-right: 20px;
  background-image: ${(props) => `url(${props?.image})`};
  background-repeat: no-repeat;
  background-size: 100% 100%;
`

const StyledText = styled(Text)`
  font-family: Poppins;
  font-weight: 500;
  width: 100%;
  font-size: 14px;
  ${({ theme }) => theme.mediaQueries.md} {
    width: 120px;
    font-size: 16px;
  }
`

export default React.memo(ImageUpload)
