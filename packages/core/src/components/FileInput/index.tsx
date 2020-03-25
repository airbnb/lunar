import React from 'react';
import { v4 as uuid } from 'uuid';
import IconUpload from '@airbnb/lunar-icons/lib/interface/IconUpload';
import IconAudio from '@airbnb/lunar-icons/lib/interface/IconAudio';
import IconPhoto from '@airbnb/lunar-icons/lib/interface/IconPhoto';
import IconVideo from '@airbnb/lunar-icons/lib/interface/IconVideo';
import IconClose from '@airbnb/lunar-icons/lib/interface/IconClose';
import { mutuallyExclusiveTrueProps } from 'airbnb-prop-types';
import FormInput, { InputProps } from '../private/FormInput';
import FormField, { FormFieldProps, partitionFieldProps } from '../FormField';
import Table, { Cell } from '../Table';
import Spacing from '../Spacing';
import Text from '../Text';
import T from '../Translate';
import IconButton from '../IconButton';
import DateTime from '../DateTime';
import FormInputButton from '../private/FormInputButton';
import { ButtonOrLinkTypes } from '../private/ButtonOrLink';
import toBytes from '../../utils/toBytes';

const acceptProp = mutuallyExclusiveTrueProps('onlyAudio', 'onlyImages', 'onlyVideo');

export type FileInputProps = Omit<InputProps, 'id'> &
  FormFieldProps & {
    /** Hide file size column in the file preview table. */
    hideFileSize?: boolean;
    /** Hide file type column in the file preview table. */
    hideFileType?: boolean;
    /** Hide last modified column in the file preview table. */
    hideLastModified?: boolean;
    /** Callback fired when a file is selected. */
    onChange: (
      files: File[],
      event: React.ChangeEvent<HTMLInputElement> | React.MouseEvent<ButtonOrLinkTypes>,
    ) => void;
    /** Only allow audio files to be uploaded. */
    onlyAudio?: boolean;
    /** Only allow images to be uploaded. */
    onlyImages?: boolean;
    /** Only allow video to be uploaded. */
    onlyVideo?: boolean;
  };

export type FileInputState = {
  files: File[];
  id: string;
};

/** A controlled input field for uploading files. */
export default class FileInput extends React.Component<FileInputProps, FileInputState> {
  static propTypes = {
    onlyAudio: acceptProp,
    onlyImages: acceptProp,
    onlyVideo: acceptProp,
  };

  static defaultProps = {
    hideFileSize: false,
    hideFileType: false,
    hideLastModified: false,
    onlyAudio: false,
    onlyImages: false,
    onlyVideo: false,
  };

  state: FileInputState = {
    files: [],
    id: uuid(),
  };

  ref = React.createRef<HTMLInputElement>();

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.currentTarget.files || []);

    this.setState({
      files,
    });

    this.props.onChange(files, event);
  };

  private handleClick = () => {
    if (this.ref.current) {
      this.ref.current.click();
    }
  };

  private handleRemoveFile = (event: React.MouseEvent<ButtonOrLinkTypes>, index: number) => {
    this.setState(
      (prevState) => ({
        files: prevState.files.filter((file, i) => i !== index),
      }),
      () => {
        this.props.onChange(this.state.files, event);
      },
    );
  };

  render() {
    const { fieldProps, inputProps } = partitionFieldProps(this.props);
    const {
      hideFileSize,
      hideFileType,
      hideLastModified,
      onlyAudio,
      onlyImages,
      onlyVideo,
      ...props
    } = inputProps;
    const { files, id } = this.state;
    let { accept } = inputProps;
    let Icon = IconUpload;

    if (onlyAudio) {
      accept = 'audio/*';
      Icon = IconAudio;
    } else if (onlyImages) {
      accept = 'image/*';
      Icon = IconPhoto;
    } else if (onlyVideo) {
      accept = 'video/*';
      Icon = IconVideo;
    }

    return (
      <FormField {...fieldProps} id={id}>
        <FormInput
          {...props}
          hidden
          id={id}
          accept={accept}
          type="file"
          tagName="input"
          propagateRef={this.ref}
          onChange={this.handleChange}
        />

        <FormInputButton
          inverted
          invalid={fieldProps.invalid}
          small={fieldProps.small}
          large={fieldProps.large}
          disabled={props.disabled}
          afterIcon={<Icon decorative size="1.25em" />}
          onClick={this.handleClick}
        >
          <T
            k="lunar.form.chooseFile"
            phrase="Choose file||||Choose files"
            smartCount={props.multiple ? 0 : 1}
          />

          {files.length > 0 && <span>{` (${files.length})`}</span>}
        </FormInputButton>

        {files.length > 0 && !fieldProps.inline && (
          <Spacing top={1}>
            <Text small={fieldProps.small}>
              <Table compact striped>
                <tbody>
                  {files.map((file, i) => (
                    <tr key={file.name}>
                      <Cell>{file.name}</Cell>

                      {!hideFileSize && <Cell>{toBytes(file.size)}</Cell>}

                      {!hideLastModified && (
                        <Cell>
                          <DateTime short at={file.lastModified} />
                        </Cell>
                      )}

                      {!hideFileType && <Cell>{file.type}</Cell>}

                      <Cell endAlign>
                        <IconButton
                          onClick={(event) => {
                            this.handleRemoveFile(event, i);
                          }}
                        >
                          <IconClose
                            accessibilityLabel={T.phrase(
                              'lunar.form.removeFile',
                              'Remove chosen file',
                            )}
                          />
                        </IconButton>
                      </Cell>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Text>
          </Spacing>
        )}
      </FormField>
    );
  }
}
