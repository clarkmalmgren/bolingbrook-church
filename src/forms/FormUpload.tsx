import { FunctionComponent, useContext } from 'react'
import { FormContext } from './Form'
import ReactMuiFileuploader from 'react-mui-fileuploader'

export type CommonFormUploadProps = {
  id: string
  label: string
  disabled?: boolean
}

export type FormUploadProps = CommonFormUploadProps & {
  header: string
  acceptedType: string
  allowedExtensions: string[]
}

export const FormUpload: FunctionComponent<FormUploadProps> =
  ({ id, label, disabled, header, acceptedType, allowedExtensions }) => {
    const { setValue } = useContext(FormContext)

    return (
      <ReactMuiFileuploader
        title={label}
        maxFileSize={10}
        maxUploadFiles={1}
        header={header}
        acceptedType={acceptedType}
        allowedExtensions={allowedExtensions}
        ContainerProps={{ sx: { border: 'none' } }}
        disabled={disabled}
        onError={ () => 1 }
        onContextReady={ () => 1 }
        onFilesChange={ (f) => setValue(id, f[0]) }
      />
    )
  }

export const FormPhoto: FunctionComponent<CommonFormUploadProps> = 
  ({ id, label, disabled }) => {
    return (
      <FormUpload
        id={id} label={label} disabled={disabled}
        header="[Drag Image Here]"
        acceptedType={'image/*'}
        allowedExtensions={['jpg', 'jpeg', 'png', 'webp']}
      />
    )
  }


export const FormVideo: FunctionComponent<CommonFormUploadProps> = 
  ({ id, label, disabled }) => {
    return (
      <FormUpload
        id={id} label={label} disabled={disabled}
        header="[Drag Image Here]"
        acceptedType={'video/*'}
        allowedExtensions={['mov', 'quicktime', 'mpeg', 'mp4', 'webm']}
      />
    )
  }


export const FormCsv: FunctionComponent<CommonFormUploadProps> = 
  ({ id, label, disabled }) => {
    return (
      <FormUpload
        id={id} label={label} disabled={disabled}
        header="[Drag File Here]"
        acceptedType={'text/csv'}
        allowedExtensions={['csv']}
      />
    )
  }


