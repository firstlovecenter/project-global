import * as functions from 'firebase-functions'
import { Storage } from '@google-cloud/storage'
import { tmpdir } from 'os'
import { dirname, join } from 'path'
import * as sharp from 'sharp'

const gcs = new Storage()
export const resizeAvatar = functions.storage
  .object()
  .onFinalize(async (object) => {
    const bucket = gcs.bucket(object.bucket)

    const filePath = object.name ?? ''
    const fileName = filePath?.split('/').pop()
    const tmpFilePath = join(tmpdir(), filePath)

    const avatarFileName = 'avatar_' + fileName
    const tmpAvatarPath = join(tmpdir(), avatarFileName)

    if (fileName?.includes('avatar_')) {
      console.log('exiting function')
      return false
    }

    await bucket.file(filePath).download({
      destination: tmpFilePath,
    })

    await sharp(tmpFilePath).resize(100, 100).toFile(tmpAvatarPath)

    return bucket.upload(tmpAvatarPath, {
      destination: join(dirname(filePath), avatarFileName),
    })
  })
