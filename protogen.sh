#!/bin/bash

# ###### FUNCTION ######
platform="$(uname)"
case $platform in
'Darwin')
  platform='mac'
  ;;
'Linux')
  platform='linux'
  ;;
MINGW64_NT*)
  platform='win'
  ;;
'MINGW64_NT-10.0')
  platform='win'
  ;;
'FreeBSD')
  platform='freebsd'
  ;;
'SunOS')
  platform='solaris'
  ;;
'AIX') ;;
*) ;;
esac
echo "$OS"

function echo_fail() {
  printf "\e[31m✘ ${1}"
  printf "\033\e[0m"
}

function echo_pass() {
  printf "\e[32m✔️ ${1}"
  printf "\033\e[0m"
}

function echo_done() {
  printf "\e[32m✨  ${1}"
  printf "\033\e[0m"
}

function clean_schema() {
  if [ -d schema ]; then
    rm -rf schema
  fi
}

function clean_old_proto_dir() {
  directory="./src/proto"
  if [ -d "${directory}" ]; then
    rm -rf $directory
  fi
}

function update_schema() {
  clean_old_proto_dir
  clean_schema
  git clone git@github.com:zoobc/zoobc-schema.git schema
  echo "$(echo_pass) Cloning zoobc-schema Done"
}

# ###### EXECUTES ######
# 1. Check platform
SECONDS=0
echo "You appear to be running on ${platform}"

# 2. Cloning zoobc-schema
echo "Start cloning zoobc-schema..."
update_schema

# 3. Download grpc-web
GRPC_WEB_VERSION="1.0.5"
echo "Downloading grpc-web v${GRPC_WEB_VERSION} for ${platform}..."
if [[ $platform == 'linux' ]]; then
  GRPC_WEB_URL="https://github.com/grpc/grpc-web/releases/download/${GRPC_WEB_VERSION}/protoc-gen-grpc-web-${GRPC_WEB_VERSION}-linux-x86_64"
elif [[ $platform == 'mac' ]]; then
  GRPC_WEB_URL="https://github.com/grpc/grpc-web/releases/download/${GRPC_WEB_VERSION}/protoc-gen-grpc-web-${GRPC_WEB_VERSION}-darwin-x86_64"
elif [[ $platform == 'win' ]]; then
  GRPC_WEB_URL="https://github.com/grpc/grpc-web/releases/download/${GRPC_WEB_VERSION}/protoc-gen-grpc-web-${GRPC_WEB_VERSION}-windows-x86_64.exe"
else
  echo "$(echo_fail) Cannot download grpc web. Platform ${platform} is not currently supported by grpc web"
  exit 1
fi

if [[ $platform == 'win' ]]; then
  GRPC_WEB_PATH="./protoc-gen-grpc-web.exe"
else
  GRPC_WEB_PATH="/usr/local/bin/protoc-gen-grpc-web"
fi

##CHECKING PLATFORM TO GIVE PERMISSION TO LINUX TO EDIT
if [[ $platform == 'linux' ]]; then
  sudo curl -L -o ${GRPC_WEB_PATH} ${GRPC_WEB_URL}
  sudo chmod +x ${GRPC_WEB_PATH}
else
  curl -L -o ${GRPC_WEB_PATH} ${GRPC_WEB_URL}
  chmod +x ${GRPC_WEB_PATH}
fi
echo "$(echo_pass) Downloading grpc web v${GRPC_WEB_VERSION} Done"

# 4. Download protobuf base on platform
PROTOC_VERSION="3.9.0"
echo "Downloading protoc v${PROTOC_VERSION} for ${platform}..."
if [[ $platform == 'linux' ]]; then
  PROTOC_URL="https://github.com/google/protobuf/releases/download/v${PROTOC_VERSION}/protoc-${PROTOC_VERSION}-linux-x86_64.zip"
elif [[ $platform == 'mac' ]]; then
  PROTOC_URL="https://github.com/google/protobuf/releases/download/v${PROTOC_VERSION}/protoc-${PROTOC_VERSION}-osx-x86_64.zip"
elif [[ $platform == 'win' ]]; then
  PROTOC_URL="https://github.com/google/protobuf/releases/download/v${PROTOC_VERSION}/protoc-${PROTOC_VERSION}-win64.zip"
else
  echo "$(echo_fail) Cannot download protoc. Platform ${platform} is not currently supported by ts-protoc-gen"
  exit 1
fi

echo ${PROTOC_VERSION}
if [[ $platform == 'linux' ]]; then
  sudo curl -L -o "protoc-${PROTOC_VERSION}.zip" ${PROTOC_URL}
else
  curl -L -o "protoc-${PROTOC_VERSION}.zip" ${PROTOC_URL}
fi
echo "$(echo_pass) Downloading protoc v${PROTOC_VERSION} Done"

# 5. Unzip into folder protoc
echo "Extract protoc-${PROTOC_VERSION}.zip..."
if [ -d protoc ]; then
  rm -rf protoc
fi

mkdir -p protoc
unzip -qq "protoc-${PROTOC_VERSION}.zip" -d protoc
rm -rf "protoc-${PROTOC_VERSION}.zip"
echo "$(echo_pass) Extract protoc-${PROTOC_VERSION}.zip Done"

# 6. Generating proto definitions
echo "Generating proto definitions for ${platform}..."
DIST_DIR="./grpc"
if [ -d "${DIST_DIR}" ]; then
  if [[ $platform == 'linux' ]]; then
    sudo rm -rf "${DIST_DIR}"
  else
    rm -rf "${DIST_DIR}"
  fi
fi
mkdir -p "${DIST_DIR}"
PROTOC=./protoc/bin/protoc

if [[ $platform == 'win' ]]; then
  PROTOC_GEN_TS=$(pwd)"/node_modules/.bin/protoc-gen-ts.cmd"
else
  PROTOC_GEN_TS="./node_modules/.bin/protoc-gen-ts"
fi

if [[ $platform == 'linux' ]]; then
  sudo $PROTOC \
    --plugin=protoc-gen-grpc-web=${GRPC_WEB_PATH} \
    --plugin=protoc-gen-ts=${PROTOC_GEN_TS} \
    --ts_out=service=grpc-web:${DIST_DIR} \
    --js_out=import_style=commonjs,binary:${DIST_DIR} \
    --grpc-web_out=import_style=commonjs,mode=grpcwebtext:${DIST_DIR} \
    ./schema/model/*.proto \
    ./schema/service/*.proto \
    ./schema/google/api/*.proto \
    --proto_path=./schema
else
  $PROTOC \
    --plugin=protoc-gen-grpc-web=${GRPC_WEB_PATH} \
    --plugin=protoc-gen-ts=${PROTOC_GEN_TS} \
    --ts_out=service=grpc-web:${DIST_DIR} \
    --js_out=import_style=commonjs,binary:${DIST_DIR} \
    --grpc-web_out=import_style=commonjs,mode=grpcwebtext:${DIST_DIR} \
    ./schema/model/*.proto \
    ./schema/service/*.proto \
    ./schema/google/api/*.proto \
    --proto_path=./schema
fi
echo "$(echo_pass) Generating proto definitions for ${platform} Done"

# 7. Cleanup downloaded proto directory
echo "Cleaning temp generator..."
if [[ $platform == 'linux' ]]; then
  sudo rm -rf protoc
  sudo rm -rf ${GRPC_WEB_PATH}
else
  rm -rf protoc
  rm -rf ${GRPC_WEB_PATH}
fi

clean_schema
duration=$SECONDS
echo "$(echo_done) Done in $(($duration / 60)) minutes and $(($duration % 60)) seconds."
echo "     The Generating proto in the '${DIST_DIR}' directory!"

sleep 5s
