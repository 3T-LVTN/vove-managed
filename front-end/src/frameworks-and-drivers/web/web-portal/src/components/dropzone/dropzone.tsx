import {useEffect, useRef, useState} from 'react';
import {Text, Group, createStyles, rem, Container, Space, Grid, ScrollArea, Flex, ActionIcon} from '@mantine/core';
import {Dropzone, MIME_TYPES} from '@mantine/dropzone';
import {IconCloudUpload, IconX, IconDownload, IconFileX} from '@tabler/icons-react';
import {ModelApi} from "@front-end/frameworks-and-drivers/app-sync/model";
import {ModelInteractors} from "@front-end/application/interactors/model";
import {ModelController} from "@front-end/interface-adapters/controllers/model";

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    marginBottom: rem(10),
  },

  dropzone: {
    borderWidth: rem(1),
    paddingBottom: rem(50),
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },
}));

export interface DropzoneButtonProps {
  uploadFile: File | null;
  setUploadFile: (file: File | null) => void;
}

export function DropzoneButton({uploadFile, setUploadFile}: DropzoneButtonProps) {
  const {classes, theme} = useStyles();
  const openRef = useRef<() => void>(null);

  const previews = (
    <Container>
      <Space h="xs"/>
      <Flex
        gap="md"
        justify="center"
        align="center"
        direction="row"
        wrap="wrap"
      >
        <Text fw={700}>
          Uploaded file:
        </Text>
        <Text td="underline">
          {uploadFile?.name}
        </Text>
        <ActionIcon
          onClick={() => {
            console.log("uploaded");
            setUploadFile(null);
          }}
        >
          <IconFileX size="1rem" stroke={1.5}/>
        </ActionIcon>
      </Flex>
    </Container>
  );

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={(files) => setUploadFile(files[0])}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.csv]}
        maxSize={30 * 1024 ** 2}
      >
        <div style={{pointerEvents: 'none'}}>
          <Group position="center">
            <Dropzone.Accept>
              <IconDownload
                size={rem(50)}
                color={theme.colors[theme.primaryColor][6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX size={rem(50)} color={theme.colors.red[6]} stroke={1.5}/>
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload
                size={rem(50)}
                color={theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black}
                stroke={1.5}
              />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Csv file less than 30mb</Dropzone.Reject>
            <Dropzone.Idle>Upload data</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Drag&apos;n&apos;drop files here to upload. We can accept only <i>.csv</i> files that
            are less than 30mb in size.
          </Text>
        </div>
      </Dropzone>
      {!!uploadFile && previews}
    </div>
  );
}
